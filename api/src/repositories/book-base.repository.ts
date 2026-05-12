import { query, type SQLValue } from "../config/db-query.config.js";
import type BookBase from "../models/book-base.model.js";

export async function create(book: BookBase): Promise<BookBase[]>{
  const params = [
    book.title,
    book.language,
    book.format
  ];
  return await query("INSERT INTO books (title, language, format) VALUES (?, ?, ?)", params);
}

export async function findAll(): Promise<BookBase[]> {
  return await query(
    `SELECT 
      books.*,
      booksauthors.description AS description,
      booksseries.index_series AS indexVolume
    FROM books
    LEFT JOIN booksseries ON books.id = booksseries.book_id
    LEFT JOIN booksauthors ON books.id = booksauthors.book_id`
  )
}

export async function findById(id: string): Promise<BookBase[]> {
  return await query(
    `SELECT 
      books.*,
      booksauthors.description AS description,
      booksseries.index_series AS indexVolume
    FROM books
    LEFT JOIN booksseries ON books.id = booksseries.book_id
    LEFT JOIN booksauthors ON books.id = booksauthors.book_id
    WHERE books.id = ?`, [id]);
}

export async function findByIdAndUpdate(id: string, book: BookBase): Promise<SQLValue> {
  const fields: string[] = [];
  const values: (string | number)[] = [];

  if (book.title !== undefined) {
    fields.push("books.title = ?");
    values.push(book.title);
  }

  if (book.language !== undefined) {
    fields.push("books.language = ?");
    values.push(book.language);
  }

  if (book.format !== undefined) {
    fields.push("books.format = ?");
    values.push(book.format);
  }

  if (book.description !== undefined) {
    fields.push("booksauthors.description = ?");
    values.push(book.description);
  }

  if (book.indexVolume !== undefined) {
    fields.push("booksseries.index_series = ?");
    values.push(book.indexVolume);
  }

  values.push(id);

  const sql = `
  UPDATE books,
  LEFT JOIN booksseries ON books.id = booksseries.book_id
  LEFT JOIN booksauthors ON books.id = booksauthors.book_id
  SET ${fields.join(", ")}
  WHERE books.id = ?`;
  
  return await query(sql, values);
}

export async function findByIdAndDelete(id: string, book: BookBase): Promise<SQLValue> {
  return await query("SELECT FROM books WHERE id = ?", [id]);
}