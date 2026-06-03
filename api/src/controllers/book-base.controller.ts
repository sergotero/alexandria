import createHttpError from "http-errors";
import type { Request, Response } from "express";
import * as BookBaseService from "./../services/book-base.service.js";
import type { APIResponse, BookBase, BookBaseDTO, Formats, Languages } from "@shared/types";


export async function create(req: Request, res: Response): Promise<void | never>{
  const languages = ["Español", "Inglés", "Alemán", "Japonés"];
  const formats = ["Digital", "Impreso", "Ambos"];
  // const languages = ["Spanish", "English", "German", "Japanese"];
  // const formats = ["Digital", "Printed", "Both"];

  const { title, language, format } = req.body;

  if (title == undefined) {
    throw createHttpError(400, "El título es un parámetro obligatorio");
  } else if (typeof title !== "string") {
    throw createHttpError(400, "El titulo debe ser un string");
  }

  if (language == undefined) {
    throw createHttpError(400, "El idioma es un parámetro obligatorio");
  } else if (typeof language !== "string" || !languages.includes(language)) {
    throw createHttpError(400, "El idioma no se encuentra definido en la base de datos");
  }
  
  if (format == undefined) {
    throw createHttpError(400, "El formato es un parámetro obligatorio");
  } else if (typeof req.body.format !== "string" || !formats.includes(format)) {
    throw createHttpError(400, "El formato no se encuentra definido en la base de datos");
  }

  const bookBase: BookBaseDTO = {
    title: title,
    language: language as Languages,
    format: format as Formats,
    description: req.body?.description ?? null,
    indexVolume: req.body?.indexVolume ?? null,
    cover: req.body?.cover ?? null
  }

  const result = await BookBaseService.findOrCreate(bookBase);
  const response: APIResponse<BookBase> = {
    success: true,
    data: result
  };
  res.status(201).json(response);
}

export async function list(req: Request, res: Response): Promise<void>{
  const bookBases = await BookBaseService.list();
  const response: APIResponse<BookBase[]> = {
    success: true,
    data: bookBases
  };
  res.status(200).json(response);
}

export async function detail(req: Request, res: Response): Promise<void | never>{
  const { id } = req.params;

  if (id == undefined) {
    throw createHttpError(400, "El ID del libro es un parámetro obligatorio");
  } else if (typeof id !== 'string') {
    throw createHttpError(400, "El ID del libro no es válido");
  }

  const bookbase = await BookBaseService.detail(id);
  const response: APIResponse<BookBase> = {
    success: true,
    data: bookbase
  };
  res.status(200).json(response);
}

export async function update(req: Request, res: Response): Promise<void | never>{
  const { id } = req.params;
  
  if (id === undefined) {
    throw createHttpError(400, "El ID del libro es un parámetro obligatorio");
  } else if (typeof id !== "string") {
    throw createHttpError(400, "El ID del libro no es válido");
  }

  const bookBase: BookBase = req.body;
  const updatedBaseBook = await BookBaseService.update(id, bookBase);
  const response: APIResponse<BookBase> = {
    success: true,
    data: updatedBaseBook
  };
  res.status(200).json(response);
}

export async function destroy(req: Request, res: Response): Promise<void | never>{
  const { id } = req.params;
  
  if (id == undefined) {
    throw createHttpError(400, "El ID del libro es un parámetro obligatorio");
  } else if (typeof id !== 'string') {
    throw createHttpError(400, "El ID del libro no es válido");
  }

  const baseBook = await BookBaseService.destroy(id);
  const response: APIResponse<true> = {
    success: true,
    data: baseBook
  };
  res.status(204).json(response)
}