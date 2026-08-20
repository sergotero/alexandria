import createHttpError from "http-errors";
import * as BooksAuthorsRepository from "../repositories/books-authors.repository.js";
import type { BooksAuthors, BooksAuthorsDTO } from "@shared/types";


export async function findOrCreate(bookId: string, authorId: string): Promise<BooksAuthors | never>{

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

export async function update(oldBookId: string, oldAuthorId: string, data: BooksAuthorsDTO): Promise<BooksAuthors | never> {

  const update = await BooksAuthorsRepository.findByIdAndUpdate(oldBookId, oldAuthorId, data);
  
  if (update.affectedRows === 0) {
    throw createHttpError(400, "Se ha producido un error al actualizar");
  }
  const result = await BooksAuthorsRepository.findById(data.bookId.toString(), data.authorId.toString());
  
  return result;
}

export async function destroy(bookId: string, authorId: string): Promise<true | never> {
  const result = await BooksAuthorsRepository.findByIdAndDelete(bookId, authorId);
  if (result.affectedRows === 0) {
    throw createHttpError(400, "Se ha producido un error al borrar");
  }

  return true;
}