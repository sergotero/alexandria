import type { BooksCollections, BooksCollectionsDTO, SQLResponse, SQLValue } from "@shared/types";
import { query } from "../config/db-query.config.js";


export async function create(bookId: number, collectionId: number): Promise<SQLResponse> {
  return await query("INSERT INTO bookscollections (book_id, collection_id) VALUES (?, ?)", [bookId!, collectionId]);
}

export async function findById(bookId: number, collectionId: number): Promise<BooksCollections> {
  return await query("SELECT book_id, collection_id FROM bookscollections WHERE book_id = ? AND collection_id = ?", [bookId, collectionId]);
}

export async function findByIdAndUpdate(oldBookId: number, oldCollectionId: number, data: BooksCollectionsDTO): Promise<SQLResponse>{
  const {bookId: newBookId, collectionId: newCollectionId} = data;
  
  const fields: string[] = [];
  const values: SQLValue[] = [];

  if (newBookId !== undefined) {
    fields.push("book_id = ?");
    values.push(newBookId);
  }
  
  if (newCollectionId !== undefined) {
    fields.push("collection_id = ?");
    values.push(newCollectionId);
  }
  
  values.push(oldBookId);
  values.push(oldCollectionId);
  
  return query(`UPDATE bookscollections SET ${fields.join(", ")} WHERE book_id = ? AND collection_id = ?`, values);
}

export async function findByIdAndDelete(bookId: number, collectionId: number): Promise<SQLResponse> {
  return query("DELETE FROM bookscollections WHERE book_id = ? AND collection_id = ?", [bookId, collectionId]);
}
