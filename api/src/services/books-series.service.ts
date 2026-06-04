import createHttpError from "http-errors";
import * as BooksSeriesRepository from "../repositories/books-series.repository.js";
import type { BookBase, FullBook, Series, SQLValue } from "@shared/types";


export async function findOrCreate(bookBase: BookBase, series: Series): Promise<Record<string, SQLValue> | true | never> {
  const bookId = bookBase.id!.toString();
  const seriesId = series.id!.toString();
  const existing = await BooksSeriesRepository.findByIds(bookId, seriesId);
  if (existing.length !== 0) {
    return existing[0];
  }

  const newInsert = await BooksSeriesRepository.create(bookBase, series);

  if (newInsert.affectedRows === 0) {
    throw createHttpError(400, "Se ha producido un error en la base de datos");
  }

  return true;
}

export async function update(fullBook: FullBook, data: any): Promise<true | never> {
  const update = await BooksSeriesRepository.findByIdsAndUpdate(fullBook, data);
  
  if (update.affectedRows === 0) {
    throw createHttpError(400, "Se ha producido un error durante la actualización");
  }
  
  return true;
}