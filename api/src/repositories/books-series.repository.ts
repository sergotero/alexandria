import type { BooksSeries, BooksSeriesDTO, SQLResponse } from "@shared/types";
import { query } from "../config/db-query.config.js";


export async function create(bookId: string, seriesId: string): Promise<SQLResponse> {
  return await query("INSERT INTO booksseries (book_id, series_id) VALUES (?, ?)", [bookId!, seriesId]);
}

export async function findById(bookId: string, seriesId: string): Promise<BooksSeries> {
  return await query("SELECT book_id, series_id FROM booksseries WHERE book_id = ? AND series_id = ?", [bookId, seriesId]);
}

export async function findByIdAndUpdate(oldBookId: string, oldSeriesId: string, data: BooksSeriesDTO): Promise<SQLResponse>{
  const {bookId: newBookId, seriesId: newSeriesId} = data;
  
  const fields: string[] = [];
  const values: string[] = [];

  if (data.bookId !== undefined) {
    fields.push("book_id = ?");
    values.push(newBookId.toString());
  }
  
  if (data.seriesId !== undefined) {
    fields.push("series_id = ?");
    values.push(newSeriesId.toString());
  }
  
  values.push(oldBookId);
  values.push(oldSeriesId);
  
  return query(`UPDATE booksseries SET ${fields.join(", ")} WHERE book_id = ? AND series_id = ?`, values);
}

export async function findByIdAndDelete(bookId: string, seriesId: string): Promise<SQLResponse> {
  return query("DELETE FROM booksseries WHERE book_id = ? AND series_id = ?", [bookId, seriesId]);
}
