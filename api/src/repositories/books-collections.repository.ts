import { query } from "../config/db-query.config.js";
import type Collection from "../models/collection.model.js";
import type BookBase from "../models/book-base.model.js";
import type SQLResponse from "../models/SQLResponse.js";
import type FullBook from "../models/full-book.model.js";

export async function create(bookBase: BookBase, collection: Collection): Promise<SQLResponse> {
  return await query("INSERT INTO bookscollections (book_id, collection_id) VALUES (?, ?)", [bookBase.id!, collection.id!]);
}

export async function findByIds(bookId: string, collectionId: string): Promise<any[]> {
  return await query("SELECT * FROM bookscollections WHERE book_id = ? AND collection_id = ?", [bookId, collectionId]);
}

export async function findByIdsAndUpdate(fullBook: FullBook, data: any): Promise<SQLResponse> {

  const oldBookId = fullBook.bookBase.id!.toString();
  const oldCollectionId = fullBook.collection.id!.toString();

  const fields: string[] = [];
  const values: (string | number | null)[] = [];

  fields.push("book_id = ?");
  fields.push("collection_id = ?");
  values.push(data.bookBase.id);
  values.push(data.collection.id);

  values.push(oldBookId);
  values.push(oldCollectionId);

  return await query(`UPDATE bookscollections SET ${fields.join(", ")} WHERE book_id = ? AND collection_id = ?`, values);
}