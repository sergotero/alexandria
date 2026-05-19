import createHttpError from "http-errors";
import type { Request, Response } from "express";
import * as BookBaseService from "./../services/book-base-service.js";
import type BookBase from "../models/book-base.model.js";
import type { Formats, Languages } from "../models/book-base.model.js";


export async function create(req: Request, res: Response): Promise<void | never>{
  const languages = ["Español", "Inglés", "Alemán", "Japonés"];
  const formats = ["Digital", "Impreso", "Ambos"];

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

  const bookBase: BookBase = {
      title: title,
      language: language as Languages,
      format: format as Formats,
      description: req.body?.description ?? null,
      indexVolume: req.body?.indexVolume ?? null
  }
  const result = await BookBaseService.findOrCreate(bookBase);
  res.status(201).json(result);
}

export async function list(req: Request, res: Response): Promise<void>{
  const bookBases = await BookBaseService.list();
  res.status(200).json(bookBases);
}

export async function detail(req: Request, res: Response): Promise<void | never>{
  const { id } = req.params;

  if (id == undefined) {
    throw createHttpError(400, "El ID del libro es un parámetro obligatorio");
  } else if (typeof id !== 'string') {
    throw createHttpError(400, "El ID del libro no es válido");
  }

  const bookbase = await BookBaseService.detail(id);

  res.status(200).json(bookbase);
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
  res.status(200).json(updatedBaseBook);
}

export async function destroy(req: Request, res: Response): Promise<void | never>{
  const { id } = req.params;
  
  if (id == undefined) {
    throw createHttpError(400, "El ID del libro es un parámetro obligatorio");
  } else if (typeof id !== 'string') {
    throw createHttpError(400, "El ID del libro no es válido");
  }

  const baseBook = await BookBaseService.destroy(id);
  res.status(204).send(baseBook)
}