import { query } from "../config/db-query.config.js";
import type Author from "../models/author.model.js";
import type BookBase from "../models/book-base.model.js";
import type SQLResponse from "../models/SQLResponse.js";

export async function create(bookBase: BookBase, author: Author): Promise<SQLResponse> {
  return await query("INSERT INTO booksauthors (book_id, author_id, description) VALUES (?, ?, ?)", [bookBase.id!, author.id!, bookBase.description!]);
}

export async function findByIds(bookId: string, authorId: string) {
  return await query("SELECT * FROM booksauthors WHERE book_id = ? AND author_id = ?", [bookId, authorId]);
}