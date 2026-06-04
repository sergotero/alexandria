import createHttpError from "http-errors";
import * as BooksAuthorsRepository from "../repositories/books-authors.repository.js";
import type { Author, BookBase, FullBook, SQLValue } from "@shared/types";


export async function findOrCreate(bookBase: BookBase, author: Author): Promise<Record<string, SQLValue> | true | never> {
  const bookId = bookBase.id!.toString();
  const authorId = author.id!.toString();
  const existing = await BooksAuthorsRepository.findByIds(bookId, authorId);
  if (existing.length !== 0) {
    return existing[0];
  }

  const newInsert = await BooksAuthorsRepository.create(bookBase, author);

  if (newInsert.affectedRows === 0) {
    throw createHttpError(400, "Se ha producido un error");
  }

  return true;
}

export async function update(fullBook: FullBook, data: any): Promise<true | never> {

  const update = await BooksAuthorsRepository.findByIdsAndUpdate(fullBook, data);

  if (update.affectedRows === 0) {
    throw createHttpError(400, "Se ha producido un error al actualizar");
  }

  return true;
}