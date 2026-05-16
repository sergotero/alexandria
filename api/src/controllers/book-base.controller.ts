import type { Request, Response } from "express";
import * as BookBaseService from "./../services/book-base-service.js";
import type BookBase from "../models/book-base.model.js";


export async function create(req: Request, res: Response): Promise<void>{
  const languages = ["Español", "Inglés", "Alemán", "Japonés"];
  const formats = ["Digital", "Impreso", "Ambos"];

  if (req.body.title == undefined) {
    throw new Error("El título es un parámetro obligatorio");
  } else if (typeof req.body.title !== "string") {
    throw new Error("El titulo debe ser un string");
  }

  if (req.body.language == undefined) {
    throw new Error("El título es un parámetro obligatorio");
  } else if (typeof req.body.language !== "string" || !languages.includes(req.body.language)) {
    throw new Error("El lenguaje no se encuentra definido en la base de datos");
  }
  
  if (req.body.format == undefined) {
    throw new Error("El formato es un parámetro obligatorio");
  } else if (typeof req.body.format !== "string" || !formats.includes(req.body.format)) {
    throw new Error("El idioma no se encuentra definido en la base de datos");
  }

  const bookBase: BookBase = {
      title: req.body.title,
      language: req.body.language,
      format: req.body.format,
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

export async function detail(req: Request, res: Response){
  const { id } = req.params;

  if(typeof id !== "string") {
    throw new Error("ID de libro no válido")
  }

  const bookbase = await BookBaseService.detail(id);

  res.status(200).json(bookbase);
}

export async function update(req: Request, res: Response){
  const { id } = req.params;
  
  if (typeof id !== "string") {
    throw new Error("ID de libro no válido");
  }
  const bookBase: BookBase = req.body;

  const updatedBaseBook = await BookBaseService.update(id, bookBase);
  res.status(200).json(updatedBaseBook);
}

export async function destroy(req: Request, res: Response){
  const { id } = req.params;
  
  if (typeof id !== "string") {
    throw new Error("ID de libro no válido");
  }

  const baseBook = await BookBaseService.destroy(id);
  res.status(204).json(baseBook)
}