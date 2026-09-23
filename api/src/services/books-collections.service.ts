import createHttpError from "http-errors";
import * as BooksCollectionsRepository from "../repositories/books-collections.repository.js";
import type { BooksCollections, BooksCollectionsDTO } from "@shared/types";


export async function createLink(bookId: number, collectionId: number): Promise<BooksCollections | never>{

  const exists = await BooksCollectionsRepository.findById(bookId, collectionId);

  if (Array.isArray(exists) && exists.length === 0) {
    const newInsert = await BooksCollectionsRepository.create(bookId, collectionId);
    
    if (newInsert.affectedRows === 0) {
      throw createHttpError(400, "Se ha producido un error")
    }

    return await BooksCollectionsRepository.findById(bookId, collectionId);
  } else {
    return exists;
  }
}

export async function update(oldBookId: number, oldCollectionId: number, data: BooksCollectionsDTO): Promise<BooksCollections | never> {

  const update = await BooksCollectionsRepository.findByIdAndUpdate(oldBookId, oldCollectionId, data);
  
  if (update.affectedRows === 0) {
    throw createHttpError(400, "Se ha producido un error al actualizar");
  }
  const result = await BooksCollectionsRepository.findById(data.bookId, data.collectionId);
  
  return result;
}

export async function destroy(bookId: number, collectionId: number): Promise<true | never> {
  const result = await BooksCollectionsRepository.findByIdAndDelete(bookId, collectionId);
  if (result.affectedRows === 0) {
    throw createHttpError(400, "Se ha producido un error al borrar");
  }

  return true;
}