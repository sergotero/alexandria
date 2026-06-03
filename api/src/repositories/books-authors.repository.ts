import type { Author, BookBase, FullBook, SQLResponse } from "@shared/types";
import { query } from "../config/db-query.config.js";


export async function create(bookBase: BookBase, author: Author): Promise<SQLResponse> {
  return await query("INSERT INTO booksauthors (book_id, author_id, description) VALUES (?, ?, ?)", [bookBase.id!, author.id!, bookBase.description!]);
}

export async function findByIds(bookId: string, authorId: string) {
  return await query("SELECT * FROM booksauthors WHERE book_id = ? AND author_id = ?", [bookId, authorId]);
}

export async function findByIdsAndUpdate(fullBook: FullBook, data: any): Promise<SQLResponse> {
  const bookId = data.bookBase.id!.toString();
  const authorId = data.author.id!.toString();
  const oldBookId = fullBook.bookBase.id!.toString();
  const oldAuthorId = fullBook.author.id!.toString();


  const fields: string[] = [];
  const values: (string | number | null)[] = [];

  if (data.bookBase.description !== undefined) {
    fields.push("book_id = ?");
    fields.push("author_id = ?");
    fields.push("description = ?");
    values.push(bookId);
    values.push(authorId);
    values.push(data.bookBase.description);
  } else {
    fields.push("book_id = ?");
    fields.push("author_id = ?");
    values.push(bookId);
    values.push(authorId);
  }

  values.push(oldBookId);
  values.push(oldAuthorId);

  return await query(`UPDATE booksauthors SET ${fields.join(", ")} WHERE book_id = ? AND author_id = ?`, values);
}