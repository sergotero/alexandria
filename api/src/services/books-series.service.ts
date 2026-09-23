import createHttpError from "http-errors";
import * as BooksSeriesRepository from "../repositories/books-series.repository.js";
import type { BooksSeries, BooksSeriesDTO } from "@shared/types";


export async function createLink(bookId: number, seriesId: number, indexVolume?: number): Promise<BooksSeries | never>{

  const exists = await BooksSeriesRepository.findById(bookId, seriesId);

  if (Array.isArray(exists) && exists.length === 0) {
    let newInsert;
    if (indexVolume !== undefined && indexVolume !== null) {
      newInsert = await BooksSeriesRepository.create(bookId, seriesId, indexVolume);
    } else {
      newInsert = await BooksSeriesRepository.create(bookId, seriesId);
    }
    
    if (newInsert.affectedRows === 0) {
      throw createHttpError(400, "Se ha producido un error");
    }

    return await BooksSeriesRepository.findById(bookId, seriesId);
  } else {
    return exists;
  }
}

export async function update(oldBookId: number, oldSeriesId: number | null | undefined, data: BooksSeriesDTO): Promise<BooksSeries | never> {

  if (oldSeriesId === null || oldSeriesId === undefined) {
    const newInsert = await BooksSeriesRepository.create(oldBookId, data.seriesId);
    
    if (newInsert.affectedRows === 0) {
      throw createHttpError(400, "Se ha producido un error")
    }

    return await BooksSeriesRepository.findById(oldBookId, data.seriesId);
  }

  const update = await BooksSeriesRepository.findByIdAndUpdate(oldBookId, oldSeriesId, data);
  
  if (update.affectedRows === 0) {
    throw createHttpError(400, "Se ha producido un error al actualizar");
  }
  return await BooksSeriesRepository.findById(data.bookId, data.seriesId);
}

export async function destroy(bookId: number, seriesId: number): Promise<true | never> {
  const result = await BooksSeriesRepository.findByIdAndDelete(bookId, seriesId);
  if (result.affectedRows === 0) {
    throw createHttpError(400, "Se ha producido un error al borrar");
  }

  return true;
}