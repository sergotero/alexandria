import type { ReadBook, ReadBookDTO, SQLResponse, SQLValue } from "@shared/types";
import { query } from "../config/db-query.config.js";


export async function create(readBook: ReadBookDTO): Promise<SQLResponse>{
  
  return await query(`INSERT INTO readbooks (book_id, author_id, reading_date, score, comments, completed) VALUES (?, ?, ?, ?, ?, ?)`, [readBook.bookId, readBook.authorId, readBook.readingDate, readBook.score, readBook.comments ?? null, readBook.completed]);
}
export async function list(): Promise<ReadBook[]>{
  return await query(`
    SELECT 
      readbooks.id AS id,
      readbooks.book_id AS bookId,
      readbooks.author_id AS authorId,
      books.title AS title,
      authors.alias AS author,
      readbooks.reading_date AS readingDate,
      readbooks.score AS score,
      readbooks.comments AS comments,
      readbooks.completed AS completed
    FROM readbooks 
    LEFT JOIN books ON books.id = readbooks.book_id
    LEFT JOIN authors ON authors.id = readbooks.author_id
    ORDER BY 
      readbooks.reading_date,
      authors.alias,
      books.title
  `);
}
export async function detail(id: number): Promise<ReadBook[]> {
  return await query(`
    SELECT 
      readbooks.id AS id,
      readbooks.book_id AS bookId,
      readbooks.author_id AS authorId,
      books.title AS title,
      authors.alias AS author,
      readbooks.reading_date AS readingDate,
      readbooks.score AS score,
      readbooks.comments AS comments,
      readbooks.completed AS completed
    FROM readbooks 
    LEFT JOIN books ON books.id = readbooks.book_id
    LEFT JOIN authors ON authors.id = readbooks.author_id
    WHERE readbooks.id = ?
    ORDER BY 
      readbooks.reading_date,
      authors.alias,
      books.title
  `, [id]);
}

export async function update(id: number, data: ReadBookDTO) {
  const fields: string[] = [];
  const values: SQLValue[] = [];

  if (data.bookId) {
    fields.push("book_id = ?");
    values.push(data.bookId);
  }
  if (data.authorId) {
    fields.push("author_id = ?");
    values.push(data.authorId);
  }
  if (data.readingDate) {
    fields.push("reading_date = ?");
    values.push(data.readingDate);
  }
  if (data.score) {
    fields.push("score = ?");
    values.push(data.score);
  }
  if (data.comments) {
    fields.push("comments = ?");
    values.push(data.comments);
  }
  if (data.completed) {
    fields.push("completed = ?");
    values.push(data.completed);
  }

  values.push(id);

  return await query(`UPDATE readbooks SET ${fields.join(", ")} WHERE id = ?`, values);
}

export async function destroy(id: number): Promise<SQLResponse> {
  return await query("DELETE FROM readbooks WHERE id = ?", [id]);
}