import { query } from "../config/db-query.config.js";
import type Collection from "../models/collection.model.js";
import type BookBase from "../models/book-base.model.js";

export async function create(bookBase: BookBase, collection: Collection) {
  return await query("INSERT INTO bookscollections (book_id, collection_id) VALUES (?, ?)", [bookBase.id!, collection.id!]);
}

export async function findByIds(bookId: string, collectionId: string) {
  return await query("SELECT * FROM bookscollections WHERE book_id = ? AND collection_id = ?", [bookId, collectionId]);
}