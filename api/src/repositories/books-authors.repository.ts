import type { BooksAuthors, BooksAuthorsDTO, SQLResponse } from "@shared/types";
import { query } from "../config/db-query.config.js";


export async function create(bookId: string, authorId: string): Promise<SQLResponse> {
  return await query("INSERT INTO booksauthors (book_id, author_id) VALUES (?, ?)", [bookId!, authorId]);
}

export async function findById(bookId: string, authorId: string): Promise<BooksAuthors> {
  return await query("SELECT book_id, author_id FROM booksauthors WHERE book_id = ? AND author_id = ?", [bookId, authorId]);
}

export async function findByIdAndUpdate(oldBookId: string, oldAuthorId: string, data: BooksAuthorsDTO): Promise<SQLResponse>{
  const {bookId: newBookId, authorId: newAuthorId} = data;
  
  const fields: string[] = [];
  const values: string[] = [];

  if (data.bookId !== undefined) {
    fields.push("book_id = ?");
    values.push(newBookId.toString());
  }
  
  if (data.authorId !== undefined) {
    fields.push("author_id = ?");
    values.push(newAuthorId.toString());
  }
  
  values.push(oldBookId);
  values.push(oldAuthorId);
  
  return query(`UPDATE booksauthors SET ${fields.join(", ")} WHERE book_id = ? AND author_id = ?`, values);
}

export async function findByIdAndDelete(bookId: string, authorId: string): Promise<SQLResponse> {
  return query("DELETE FROM booksauthors WHERE book_id = ? AND author_id = ?", [bookId, authorId]);
}
