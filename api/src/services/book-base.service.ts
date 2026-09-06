import createHttpError from "http-errors";
import * as BookBaseRepository from "./../repositories/book-base.repository.js";
import type { BookBase, BookBaseDTO } from "@shared/types";
import * as CloudinaryService from "./cloudinary.service.js";

export async function findOrCreate(data: BookBaseDTO | BookBase): Promise<BookBase | never>{
  const { title, language, format } = data;

  const existing = await BookBaseRepository.findByTitle(title);

  if (existing.length !== 0) {
    return existing[0] as BookBase;
  }
  
  const bookBase: BookBaseDTO = {
    title: title,
    language: language,
    format: format,
  }
  
  const result = await BookBaseRepository.create(bookBase);

  if (result.affectedRows === 0) {
    throw createHttpError(400, "Se ha producido un error en la base de datos");
  }

  const newBookBase = await detail(result.insertId.toString());
  
  return newBookBase;
}

export async function list(): Promise<BookBase[]>{
  const bookbases = await BookBaseRepository.findAll();
  return bookbases;
}

export async function detail(id: string): Promise<BookBase>{
  const bookbase = await BookBaseRepository.findById(id);
  return bookbase[0] as BookBase;
}

export async function update(id: string, bookBase: BookBaseDTO, file: Express.Multer.File | undefined): Promise<BookBase | never>{
  const { title, language, format, description, indexVolume, cloudinaryId } = bookBase;
  
  const updateData: BookBaseDTO = {
    title,
    language,
    format,
  }
  
  if (description !== undefined) {
    updateData.description = description;
  }
  
  if (indexVolume !== undefined) {
    updateData.indexVolume = indexVolume;
  }

  if (file) {
    if (cloudinaryId !== undefined && cloudinaryId !== null) {
      await CloudinaryService.destroy(cloudinaryId);
    }

    const cloudinaryFile = await CloudinaryService.upload(file);
    updateData.cover = cloudinaryFile.coverURL ?? null;
    updateData.cloudinaryId = cloudinaryFile.publicId ?? null;
  }
  

  const checkBaseBook = await BookBaseRepository.findByIdAndUpdate(id, updateData);

  if (checkBaseBook.affectedRows === 0) {
    throw createHttpError(400, "Se ha producido un error durante la actualización");
  }

  const updatedBaseBook = await detail(id);

  return updatedBaseBook;
}

export async function destroy(id: string): Promise<true | never>{
  const baseBook = await BookBaseRepository.findByIdAndDelete(id);

  if(baseBook.affectedRows === 0) {
    throw createHttpError(400, "Se ha producido un error durante el borrado");
  }
  return true;
}