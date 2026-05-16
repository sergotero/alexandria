import { query } from "../config/db-query.config.js";
import type Series from "../models/series.model.js";
import type BookBase from "../models/book-base.model.js";

export async function create(bookBase: BookBase, series: Series) {
  return await query("INSERT INTO booksseries (book_id, series_id, index_series) VALUES (?, ?, ?)", [bookBase.id!, series.id!, bookBase.indexVolume!]);
}

export async function findByIds(bookId: string, seriesId: string) {
  return await query("SELECT * FROM booksseries WHERE book_id = ? AND series_id = ?", [bookId, seriesId]);
}