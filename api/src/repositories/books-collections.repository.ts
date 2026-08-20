import type { BooksCollections, BooksCollectionsDTO, SQLResponse } from "@shared/types";
import { query } from "../config/db-query.config.js";


export async function create(bookId: string, collectionId: string): Promise<SQLResponse> {
  return await query("INSERT INTO bookscollections (book_id, collection_id) VALUES (?, ?)", [bookId!, collectionId]);
}

export async function findById(bookId: string, collectionId: string): Promise<BooksCollections> {
  return await query("SELECT book_id, collection_id FROM bookscollections WHERE book_id = ? AND collection_id = ?", [bookId, collectionId]);
}

export async function findByIdAndUpdate(oldBookId: string, oldCollectionId: string, data: BooksCollectionsDTO): Promise<SQLResponse>{
  const {bookId: newBookId, collectionId: newCollectionId} = data;
  
  const fields: string[] = [];
  const values: string[] = [];

  if (data.bookId !== undefined) {
    fields.push("book_id = ?");
    values.push(newBookId.toString());
  }
  
  if (data.collectionId !== undefined) {
    fields.push("collection_id = ?");
    values.push(newCollectionId.toString());
  }
  
  values.push(oldBookId);
  values.push(oldCollectionId);
  
  return query(`UPDATE bookscollections SET ${fields.join(", ")} WHERE book_id = ? AND collection_id = ?`, values);
}

export async function findByIdAndDelete(bookId: string, collectionId: string): Promise<SQLResponse> {
  return query("DELETE FROM bookscollections WHERE book_id = ? AND collection_id = ?", [bookId, collectionId]);
}
