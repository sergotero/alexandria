import type { SQLValue } from "../config/db-query.config.js";
import type Series from "../models/series.model.js";
import type BookBase from "../models/book-base.model.js";
import * as BooksSeriesRepository from "./../repositories/books-series.repository.js";
import type FullBook from "../models/full-book.model.js";

export async function findOrCreate(bookBase: BookBase, series: Series): Promise<Record<string, SQLValue> | boolean | never> {
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

export async function update(fullBook: FullBook, data: any): Promise<boolean | never> {
  const update = await BooksSeriesRepository.findByIdsAndUpdate(fullBook, data);
  
  if (update.affectedRows === 0) {
    throw new Error("Se ha producido un error durante la actualización");
  }
  
  return true;
}