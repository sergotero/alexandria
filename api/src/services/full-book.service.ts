import createHttpError from "http-errors";
import type { Author, BookBase, Collection, FullBook, Series, SeriesDTO } from "@shared/types";
import * as FullBookRepository from "../repositories/full-book.repository.js";
import * as BookBaseService from "./../services/book-base.service.js";
import * as AuthorService from "./author.service.js";
import * as SeriesService from "./series.service.js";
import * as CollectionService from "./../services/collection.service.js";
import * as BooksAuthorsService from "./books-authors.service.js";
import * as BooksSeriesService from "./books-series.service.js";
import * as BooksCollectionsService from "./books-collections.service.js";
import pool from "../config/db.config.js";


export async function findOrCreate(data: FullBook): Promise<FullBook | never> {

  let connection;

  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();
    const bookBase: BookBase = data.bookBase;
    const newBookBase = await BookBaseService.findOrCreate(bookBase);
    

    const author: Author = data.author;
    const newAuthor = await AuthorService.findOrCreate(author);

    let newSeries;
    let series: SeriesDTO;
    if (data.series !== undefined) {
      series = {
        name: data.series.name!,
        volumes: data.series.volumes!,
        status: data.series.status!,
      }
      newSeries = await SeriesService.findOrCreate(series);

    }

    const newCollection = await CollectionService.findOrCreate(data.collection.name);

    await BooksAuthorsService.findOrCreate(newBookBase, newAuthor);
    await BooksCollectionsService.findOrCreate(newBookBase, newCollection);
    if (newSeries) {
      await BooksSeriesService.findOrCreate(newBookBase, newSeries);
    }
    
    let fullBook: FullBook;
    if (newSeries) {
      fullBook = {
        bookBase: newBookBase,
        author: newAuthor,
        series: newSeries,
        collection: newCollection
      };
    } else {
      fullBook = {
        bookBase: newBookBase,
        author: newAuthor,
        collection: newCollection
      };
    }
    
    await connection.commit();
    return fullBook;
  } catch (error) {
    console.error("Se ha producido un error: ", error);
    if (connection) {
      await connection.rollback();
    }
    throw createHttpError(400, );
  } finally {
    if (connection) {
      await connection.release();
    }
  }
}


export async function list(page: number, limit: number): Promise<FullBook[]> {
  
  const offset = page * limit;
  const fullBooks = await FullBookRepository.findAll(limit.toString(), offset.toString());
  const books = fullBooks.map((book: any) => {
    const bookBase: BookBase = {
      id: book.book_id,
      title: book.title,
      language: book.language,
      format: book.format,
      description: book.description,
      indexVolume: book.indexVolume,
      cover: book.cover
    };
    const author: Author = {
      id: book.author_id,
      name: book.author_name,
      lastname1: book.author_lastname1,
      lastname2: book.author_lastname2,
      lastname3: book.author_lastname3,
      alias: book.author_alias
    };
    const series: Series = {
      id: book.series_id,
      name: book.series_name,
      volumes: book.volumes,
      status: book.status
    };
    const collection: Collection = {
      id: book.collection_id,
      name: book.collection_name
    }
    const fullBook: FullBook = {
      bookBase,
      author,
      series,
      collection
    }

    return fullBook;
  });
  return books;
}


export async function detail(id: string): Promise<FullBook> {
  const book = await FullBookRepository.findById(id);
    const bookBase: BookBase = {
      id: book[0].book_id,
      title: book[0].title,
      language: book[0].language,
      format: book[0].format,
      description: book[0].description,
      indexVolume: book[0].indexVolume,
      cover: book[0].cover
    };

    const author: Author = {
      id: book[0].author_id,
      name: book[0].author_name,
      lastname1: book[0].author_lastname1,
      lastname2: book[0].author_lastname2,
      lastname3: book[0].author_lastname3,
      alias: book[0].author_alias
    };

    const series: Series = {
      id: book[0].series_id,
      name: book[0].series_name,
      volumes: book[0].volumes,
      status: book[0].status
    };

    const collection: Collection = {
      id: book[0].collection_id,
      name: book[0].collection_name
    }

    const fullBook: FullBook = {
      bookBase,
      author,
      series,
      collection
    }

  return fullBook;
}


export async function update(id: string, data: FullBook): Promise<FullBook | never> {
  let connection;

  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const oldFullBook = await detail(id);

    await BooksAuthorsService.update(oldFullBook, data);
    await BooksCollectionsService.update(oldFullBook, data);
    
    if (data.series !== undefined && oldFullBook.series !== undefined && oldFullBook.series.id !== null) {
      await BooksSeriesService.update(oldFullBook, data);
    } else if (data.series !== undefined && oldFullBook.series !== undefined && oldFullBook.series.id === null) {
      await BooksSeriesService.findOrCreate(data.bookBase, data.series);
    }
    
    const newFullBook = await detail(id);
    
    await connection.commit();
    return newFullBook;
  } catch (error) {
    console.error("Se ha producido un error: ", error);
    if (connection) {
      await connection.rollback();
    }
    throw createHttpError(400, "Se ha producido un error durante la actualización");
  } finally {
    if (connection) {
      await connection.release();
    }
  }
}