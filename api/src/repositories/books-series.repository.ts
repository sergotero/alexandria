import type { BooksSeries, BooksSeriesDTO, SQLResponse, SQLValue } from "@shared/types";
import { query } from "../config/db-query.config.js";


export async function create(bookId: number, seriesId: number, indexVolume?: number): Promise<SQLResponse> {
  if (indexVolume !== undefined && indexVolume !== null) {
    return await query("INSERT INTO booksseries (book_id, series_id, index_series) VALUES (?, ?, ?)", [bookId, seriesId, indexVolume]);
  } else {
    return await query("INSERT INTO booksseries (book_id, series_id) VALUES (?, ?)", [bookId, seriesId]);
  }
}

export async function findById(bookId: number, seriesId: number): Promise<BooksSeries> {
  return await query("SELECT * FROM booksseries WHERE book_id = ? AND series_id = ?", [bookId, seriesId]);
}

export async function findByIdAndUpdate(oldBookId: number, oldSeriesId: number, data: BooksSeriesDTO): Promise<SQLResponse>{
  const {bookId: newBookId, seriesId: newSeriesId, indexVolume: newIndexVolume} = data;
  
  const fields: string[] = [];
  const values: SQLValue[] = [];

  if (newBookId !== undefined) {
    fields.push("book_id = ?");
    values.push(newBookId);
  }
  
  if (newSeriesId !== undefined) {
    fields.push("series_id = ?");
    values.push(newSeriesId);
  }

  if (newIndexVolume !== undefined && newIndexVolume !== null) {
    fields.push("index_series = ?");
    values.push(newIndexVolume);
  }
  
  values.push(oldBookId);
  values.push(oldSeriesId);
  
  return query(`UPDATE booksseries SET ${fields.join(", ")} WHERE book_id = ? AND series_id = ?`, values);
}

export async function findByIdAndDelete(bookId: number, seriesId: number): Promise<SQLResponse> {
  return query("DELETE FROM booksseries WHERE book_id = ? AND series_id = ?", [bookId, seriesId]);
}
