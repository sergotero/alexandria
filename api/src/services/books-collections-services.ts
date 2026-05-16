import type { SQLValue } from "../config/db-query.config.js";
import type Collection from "../models/collection.model.js";
import type BookBase from "../models/book-base.model.js";
import * as BooksCollectionsRepository from "./../repositories/books-collections.repository.js";

export async function findOrCreate(bookBase: BookBase, collection: Collection): Promise<Record<string, SQLValue> | boolean> {
  const bookId = bookBase.id!.toString();
  const collectionId = collection.id!.toString();
  const existing = await BooksCollectionsRepository.findByIds(bookId, collectionId);
  if (existing.length !== 0) {
    return existing[0];
  }

  const newInsert = await BooksCollectionsRepository.create(bookBase, collection);

  if (newInsert.affectedRows === 0) {
    throw new Error("Se ha producido un error");
  }

  return true;
}