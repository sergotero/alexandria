import createHttpError from "http-errors";
import * as BooksAuthorsRepository from "../repositories/books-authors.repository.js";
import type { BooksAuthors, BooksAuthorsDTO } from "@shared/types";


export async function findOrCreate(bookId: number, authorId: number): Promise<BooksAuthors | never>{

  const exists = await BooksAuthorsRepository.findById(bookId, authorId);

  if (Array.isArray(exists) && exists.length === 0) {
    const newInsert = await BooksAuthorsRepository.create(bookId, authorId);
    
    if (newInsert.affectedRows === 0) {
      throw createHttpError(400, "Se ha producido un error")
    }

    const result = await BooksAuthorsRepository.findById(bookId, authorId);
    return result;
  } else {
    return exists;
  }
}

export async function update(oldBookId: number, oldAuthorId: number, data: BooksAuthorsDTO): Promise<BooksAuthors | never> {

  const update = await BooksAuthorsRepository.findByIdAndUpdate(oldBookId, oldAuthorId, data);
  
  if (update.affectedRows === 0) {
    throw createHttpError(400, "Se ha producido un error al actualizar");
  }
  const result = await BooksAuthorsRepository.findById(data.bookId, data.authorId);
  
  return result;
}

export async function destroy(bookId: number, authorId: number): Promise<true | never> {
  const result = await BooksAuthorsRepository.findByIdAndDelete(bookId, authorId);
  if (result.affectedRows === 0) {
    throw createHttpError(400, "Se ha producido un error al borrar");
  }

  return true;
}