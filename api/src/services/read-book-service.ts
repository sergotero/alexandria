import createHttpError from "http-errors";
import type ReadBook from "../models/read-book.model.js";
import * as ReadBookRepository from "./../repositories/read-book.repository.js";
import type ReadBookExtended from "../models/read-book-extended.model.js";

export async function create(data: any): Promise<ReadBookExtended | never> {

  const readBook: ReadBook = {
    bookId: data.bookId,
    authorId: data.authorId,
    readingDate: data.readingDate,
    score: data.score,
    comments: data.comments
  }

  const result = await ReadBookRepository.create(readBook);

  if (result.affectedRows === 0) {
    throw createHttpError(400, "Se ha producido un error al insertar los datos");
  }

  return await detail(result.insertId!.toString());
}

export async function list(): Promise<ReadBookExtended[]> {
  const result = await ReadBookRepository.list();
  const readBooks = result.map((book: any) => {
    const readBook: ReadBookExtended = {
      id: Number(book.id),
      bookId: Number(book.bookId),
      authorId: Number(book.authorId),
      title: book.title,
      author: book.author,
      readingDate: new Date(book.readingDate),
      score: Number(book.score),
      comments: book.comments
    };
    return readBook;
  })
  return readBooks;
}

export async function detail(bookId: string): Promise<ReadBookExtended> {
  const book = await ReadBookRepository.detail(bookId);
  const readBook: ReadBookExtended = {
    id: Number(book[0]!.id),
    bookId: Number(book[0]!.bookId),
    authorId: Number(book[0]!.authorId),
    title: book[0]!.title,
    author: book[0]!.author,
    readingDate: new Date(book[0]!.readingDate),
    score: Number(book[0]!.score),
    comments: book[0]!.comments
  };
  return readBook;
}

export async function update(id: string, data: ReadBook): Promise<ReadBook | never> {
    const bookData: ReadBook = {
    bookId: data.bookId,
    authorId: data.authorId,
    readingDate: data.readingDate,
    score: data.score,
    comments: data.comments
  }
  const readBook = await ReadBookRepository.update(id, bookData);
  
  if (readBook.affectedRows === 0) {
    throw createHttpError(400, "Se ha producido un error durante la actualización");
  }

  return await detail(id);
}

export async function destroy(id: string): Promise<true | never> {
  const readBook = await ReadBookRepository.destroy(id);

  if (readBook.affectedRows === 0) {
    throw createHttpError(400, "Se ha producido un error durante el borrado");
  }

  return true;
}