import { query } from "../config/db-query.config.js";
import type Series from "../models/series.model.js";
import type BookBase from "../models/book-base.model.js";
import type SQLResponse from "../models/SQLResponse.js";
import type FullBook from "../models/full-book.model.js";

export async function create(bookBase: BookBase, series: Series): Promise<SQLResponse> {
  return await query("INSERT INTO booksseries (book_id, series_id, index_series) VALUES (?, ?, ?)", [bookBase.id!, series.id!, bookBase.indexVolume!]);
}

export async function findByIds(bookId: string, seriesId: string): Promise<any[]> {
  return await query("SELECT * FROM booksseries WHERE book_id = ? AND series_id = ?", [bookId, seriesId]);
}

export async function findByIdsAndUpdate(fullBook: FullBook, data: any): Promise<SQLResponse> {
  console.log("FullBook: ", fullBook);
  
  const oldBookId = fullBook.bookBase.id!.toString();
  const oldSeriesId = fullBook.series!.id!.toString();

  const fields: string[] = [];
  const values: (string | number | null)[] = [];

  if (data.bookBase.indexVolume !== undefined) {
    fields.push("book_id = ?");
    fields.push("series_id = ?");
    fields.push("index_series = ?");
    values.push(data.bookBase.id!);
    values.push(data.series!.id!);
    values.push(data.bookBase.indexVolume!.toString());
  } else {
    fields.push("book_id = ?");
    fields.push("series_id = ?");
    values.push(data.bookBase.id!);
    values.push(data.series!.id!);
  }

  values.push(oldBookId);
  values.push(oldSeriesId);

  return await query(`UPDATE booksseries SET ${fields.join(", ")} WHERE book_id = ? AND series_id = ?`, values);
}