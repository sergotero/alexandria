import createHttpError from "http-errors";
import * as ReadBookRepository from "./../repositories/read-book.repository.js";
import type { ReadBook, ReadBookDTO } from "@shared/types";

export async function create(data: any): Promise<ReadBook | never> {

  const readBook: ReadBookDTO = {
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

  return await detail(result.insertId.toString());
}

export async function list(): Promise<ReadBook[]> {
  const result = await ReadBookRepository.list();
  const readBooks = result.map((book: any) => {
    const readBook: ReadBook = {
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

export async function detail(bookId: string): Promise<ReadBook> {
  const book = await ReadBookRepository.detail(bookId);
  const readBook: ReadBook = {
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
    const bookData: ReadBookDTO = {
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

  const updatedReadBook = await detail(id);

  return updatedReadBook;
}

export async function destroy(id: string): Promise<true | never> {
  const readBook = await ReadBookRepository.destroy(id);

  if (readBook.affectedRows === 0) {
    throw createHttpError(400, "Se ha producido un error durante el borrado");
  }

  return true;
}