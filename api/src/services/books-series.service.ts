import createHttpError from "http-errors";
import * as BooksSeriesRepository from "../repositories/books-series.repository.js";
import type { BooksSeries, BooksSeriesDTO } from "@shared/types";


export async function findOrCreate(bookId: string, seriesId: string): Promise<BooksSeries | never>{

  const exists = await BooksSeriesRepository.findById(bookId, seriesId);

  if (Array.isArray(exists) && exists.length === 0) {
    const newInsert = await BooksSeriesRepository.create(bookId, seriesId);
    
    if (newInsert.affectedRows === 0) {
      throw createHttpError(400, "Se ha producido un error")
    }

    const result = await BooksSeriesRepository.findById(bookId, seriesId);
    return result;
  } else {
    return exists;
  }
}

export async function update(oldBookId: string, oldSeriesId: string, data: BooksSeriesDTO): Promise<BooksSeries | never> {

  const update = await BooksSeriesRepository.findByIdAndUpdate(oldBookId, oldSeriesId, data);
  
  if (update.affectedRows === 0) {
    throw createHttpError(400, "Se ha producido un error al actualizar");
  }
  const result = await BooksSeriesRepository.findById(data.bookId.toString(), data.seriesId.toString());
  
  return result;
}

export async function destroy(bookId: string, seriesId: string): Promise<true | never> {
  const result = await BooksSeriesRepository.findByIdAndDelete(bookId, seriesId);
  if (result.affectedRows === 0) {
    throw createHttpError(400, "Se ha producido un error al borrar");
  }

  return true;
}