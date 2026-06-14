import type { BookBase, BookBaseDTO, SQLResponse } from "@shared/types";
import { query} from "../config/db-query.config.js";


export async function create(book: BookBaseDTO): Promise<SQLResponse>{
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
      booksauthors.cover_url AS cover,
      booksauthors.cloudinary_public_id AS cloudinaryId,
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
      booksauthors.cover_url AS cover,
      booksauthors.cloudinary_public_id AS cloudinaryId,
      booksseries.index_series AS indexVolume
    FROM books
    LEFT JOIN booksseries ON books.id = booksseries.book_id
    LEFT JOIN booksauthors ON books.id = booksauthors.book_id
    WHERE books.id = ?`, [id]);
}

export async function findByTitle(title: string): Promise<BookBase[]> {
  return await query(
    `SELECT 
      books.*,
      booksauthors.description AS description,
      booksauthors.cover_url AS cover,
      booksauthors.cloudinary_public_id AS cloudinaryId,
      booksseries.index_series AS indexVolume
    FROM books
    LEFT JOIN booksseries ON books.id = booksseries.book_id
    LEFT JOIN booksauthors ON books.id = booksauthors.book_id
    WHERE books.title = ?`, [title]);
}

export async function findByIdAndUpdate(id: string, book: BookBaseDTO): Promise<SQLResponse> {
  const fields: string[] = [];
  const values: (string | number | null)[] = [];

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
  
  if (book.cover !== undefined) {
    fields.push("booksauthors.cover_url = ?");
    values.push(book.cover);
  }
  
  if (book.cloudinaryId !== undefined) {
    fields.push("booksauthors.cloudinary_public_id = ?");
    values.push(book.cloudinaryId);
  }

  if (book.indexVolume !== undefined) {
    fields.push("booksseries.index_series = ?");
    values.push(book.indexVolume);
  }

  values.push(id);
  
  return await query(`
    UPDATE books
    LEFT JOIN booksseries ON books.id = booksseries.book_id
    LEFT JOIN booksauthors ON books.id = booksauthors.book_id
    SET ${fields.join(", ")}
    WHERE books.id = ?`,
    values
  );
}

export async function findByIdAndDelete(id: string): Promise<SQLResponse> {
  return await query("DELETE FROM books WHERE id = ?", [id]);
}