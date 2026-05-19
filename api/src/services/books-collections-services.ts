import createHttpError from 'http-errors';
import type { SQLValue } from "../config/db-query.config.js";
import type Collection from "../models/collection.model.js";
import type BookBase from "../models/book-base.model.js";
import * as BooksCollectionsRepository from "./../repositories/books-collections.repository.js";
import type FullBook from "../models/full-book.model.js";

export async function findOrCreate(bookBase: BookBase, collection: Collection): Promise<Record<string, SQLValue> | true | never> {
  const bookId = bookBase.id!.toString();
  const collectionId = collection.id!.toString();
  const existing = await BooksCollectionsRepository.findByIds(bookId, collectionId);
  if (existing.length !== 0) {
    return existing[0];
  }

  const newInsert = await BooksCollectionsRepository.create(bookBase, collection);

  if (newInsert.affectedRows === 0) {
    throw createHttpError(400, "Se ha producido un error en la base de datos");
  }

  return true;
}

export async function update(fullBook: FullBook, data: any): Promise<true | never> {
  const update = await BooksCollectionsRepository.findByIdsAndUpdate(fullBook, data);

  if (update.affectedRows === 0) {
    throw createHttpError(400, "Se ha producido un error durante la actualización");
  }

  return true;
}