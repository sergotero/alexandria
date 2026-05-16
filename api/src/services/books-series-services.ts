import type { SQLValue } from "../config/db-query.config.js";
import type Series from "../models/series.model.js";
import type BookBase from "../models/book-base.model.js";
import * as BooksSeriesRepository from "./../repositories/books-series.repository.js";

export async function findOrCreate(bookBase: BookBase, series: Series): Promise<Record<string, SQLValue> | boolean> {
  const bookId = bookBase.id!.toString();
  const seriesId = series.id!.toString();
  const existing = await BooksSeriesRepository.findByIds(bookId, seriesId);
  if (existing.length !== 0) {
    return existing[0];
  }

  const newInsert = await BooksSeriesRepository.create(bookBase, series);

  if (newInsert.affectedRows === 0) {
    throw new Error("Se ha producido un error");
  }

  return true;
}