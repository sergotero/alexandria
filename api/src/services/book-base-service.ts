import type BookBase from "../models/book-base.model.js";
import type SQLResponse from "../models/SQLResponse.js";
import * as BookBaseRepository from "./../repositories/book-base.repository.js";

export async function create(data: BookBase): Promise<BookBase>{
  const { title, language, format, description, indexVolume } = data;

  const oldBook = await BookBaseRepository.findByTitle(title);

  if (oldBook.length !== 0) {
    throw new Error("El libro ya existe en la base de datos");
  }
  
  const bookBase: BookBase = {
    title: title,
    language: language,
    format: format,
  }
  
  const result = await BookBaseRepository.create(bookBase);

  if (result.affectedRows === 0) {
    throw new Error("Se ha producido un error en la base de datos");
  }

  bookBase.id = Number(result.insertId);
  bookBase.description = description ?? null;
  bookBase.indexVolume = indexVolume ?? null;

  console.log(bookBase);
  
  return bookBase;
}

export async function list(): Promise<BookBase[]>{
  const bookbases = await BookBaseRepository.findAll();
  return bookbases;
}

export async function detail(id: string): Promise<BookBase[]>{
  const bookbase = await BookBaseRepository.findById(id);
  return bookbase;
}

export async function update(id: string, bookBase: BookBase): Promise<BookBase[]>{
  const { title, language, format, description, indexVolume } = bookBase;
  
  const updateData: BookBase = {
    title,
    language,
    format,
  }

  if (description !== undefined) {
    updateData.description = description;
  }

  if (indexVolume !== undefined) {
    updateData.indexVolume = indexVolume
  }

  const checkBaseBook = await BookBaseRepository.findByIdAndUpdate(id, updateData);

  if (checkBaseBook.affectedRows === 0) {
    throw new Error("Se ha producido un error durante la actualización");
  }

  const updatedBaseBook = await BookBaseRepository.findById(id);

  return updatedBaseBook;
}

export async function destroy(id: string): Promise<boolean>{
  const baseBook = await BookBaseRepository.findByIdAndDelete(id);

  if(baseBook.affectedRows === 0) {
    throw new Error("Se ha producido un error durante el borrado");
  }
  return true;
}