import createHttpError from "http-errors";
import type { Author, BookBase, BookBaseDTO, Collection, FullBook, FullBookDTO, Series } from "@shared/types";
import * as FullBookRepository from "../repositories/full-book.repository.js";
import * as BookBaseService from "./../services/book-base.service.js";
import * as AuthorService from "./author.service.js";
import * as SeriesService from "./series.service.js";
import * as CollectionService from "./../services/collection.service.js";
import * as BooksAuthorsService from "./books-authors.service.js";
import * as BooksSeriesService from "./books-series.service.js";
import * as BooksCollectionsService from "./books-collections.service.js";
import pool from "../config/db.config.js";
import { fullBookGenerator } from "./utils.service.js";

export async function create(data: FullBookDTO): Promise<FullBook | never> {

  let connection;

  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();
    const bookBase: BookBaseDTO = {
      title: data.title,
      language: data.language,
      format: data.format,
      description: data.description ?? null,
      indexVolume: data.indexVolume ?? null,
      cover: data.cover ?? null,
      cloudinaryId: data.cloudinaryId ?? null,
    };

    const newBookBase = await BookBaseService.create(bookBase);
    const author = await AuthorService.detail(data.authorId);

    let series;
    if (data.seriesId !== undefined && data.seriesId !== 0) {
      series = await SeriesService.detail(data.seriesId);
    }
    const collection: Collection = await CollectionService.detail(data.collectionId);
    
    if (bookBase.description !== undefined && bookBase.description !== null) {
      await BooksAuthorsService.createLink(newBookBase.id, author.id, bookBase.description);
    } else {
      await BooksAuthorsService.createLink(newBookBase.id, author.id);
    }
    await BooksCollectionsService.createLink(newBookBase.id, collection.id);
    if (series !== undefined && series.id !== null) {
      if (data.indexVolume !== undefined && data.indexVolume !== null) {
        await BooksSeriesService.createLink(newBookBase.id, series.id, data.indexVolume);
      } else {
        await BooksSeriesService.createLink(newBookBase.id, series.id);
      }
    }
    
    const fullBook = detail(newBookBase.id);
    await connection.commit();
    return fullBook;
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    throw error;
  } finally {
    if (connection) {
      await connection.release();
    }
  }
}


export async function list(page: number, limit: number): Promise<FullBook[]> {
  
  const offset = page * limit;
  const fullBooks = await FullBookRepository.findAll(limit, offset);
  
  const books = fullBooks.map((book: any) => {
    const bookBase: BookBase = {
      id: book.book_id,
      title: book.title,
      language: book.language,
      format: book.format,
      description: book.description,
      indexVolume: book.indexVolume,
      cover: book.cover,
      cloudinaryId: book.cloudinaryId
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
      name: book.collection_name,
      colorCode: book.color_code
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


export async function detail(id: number): Promise<FullBook> {
  const book = await FullBookRepository.findById(id);
    const bookBase: BookBase = {
      id: book[0].book_id,
      title: book[0].title,
      language: book[0].language,
      format: book[0].format,
      description: book[0].description,
      indexVolume: book[0].indexVolume,
      cover: book[0].cover,
      cloudinaryId: book[0].cloudinaryId
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
      name: book[0].collection_name,
      colorCode: book[0].color_code
    }

    const fullBook: FullBook = {
      bookBase,
      author,
      series,
      collection
    }

  return fullBook;
}

export async function update(id: number, data: FullBook): Promise<FullBook | never> {
  let connection;

  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const oldFullBook = await detail(id);

    await BooksAuthorsService.update(
      oldFullBook.bookBase.id,
      oldFullBook.author.id,
      { bookId: data.bookBase.id, authorId: data.author.id }
    );

    await BooksCollectionsService.update(
      oldFullBook.bookBase.id,
      oldFullBook.collection.id,
      { bookId: data.bookBase.id , collectionId: data.collection.id }
    );
    
    if (data.series !== undefined && data.series.id !== null && oldFullBook.series !== undefined && oldFullBook.series.id !== null) {
        await BooksSeriesService.update(
          oldFullBook.bookBase.id,
          oldFullBook.series.id,
          { 
            bookId: data.bookBase.id, 
            seriesId: data.series.id,
            indexVolume: data.bookBase.indexVolume
          }
        );
    } else if (data.series !== undefined && oldFullBook.series !== undefined && oldFullBook.series.id === null) {
      await BooksSeriesService.createLink(data.bookBase.id, data.series.id!);
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

export async function findByTitle(title: string, limit: number, page: number): Promise<FullBook[]> {
  const offset = limit * page;
  const result = await FullBookRepository.findByTitle(title, limit, offset);
  const finalResult: FullBook[] = result.map((book) => fullBookGenerator(book));
  return finalResult;
}

export async function findByAuthor(alias: string, limit: number, page: number): Promise<FullBook[]> {
  const offset = limit * page;
  const result = await FullBookRepository.findByAuthor(alias, limit, offset);
  const finalResult: FullBook[] = result.map((book) => fullBookGenerator(book));
  return finalResult;
}

export async function findByCollection(name: string, limit: number, page: number): Promise<FullBook[]> {
  const offset = limit * page;
  const result = await FullBookRepository.findByCollection(name, limit, offset);
  const finalResult: FullBook[] = result.map((book) => fullBookGenerator(book));
  return finalResult;
}

export async function findBySeries(name: string, limit: number, page: number): Promise<FullBook[]> {
  const offset = limit * page;
  const result = await FullBookRepository.findBySeries(name, limit, offset);
  const finalResult: FullBook[] = result.map((book) => fullBookGenerator(book));
  return finalResult;
}