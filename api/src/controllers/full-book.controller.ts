import createHttpError from "http-errors";
import type { Request, Response } from "express";
import * as FullBookService from "./../services/full-book-service.js";

export async function create(req: Request, res: Response): Promise<void> {
  const fullBook = await FullBookService.findOrCreate(req.body);  
  res.status(201).json(fullBook);
}

export async function list(req: Request, res: Response): Promise<void> {
  const fullBooks = await FullBookService.list();
  res.status(200).json(fullBooks);
}

export async function detail(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  if (id == undefined) {
    throw createHttpError(400, "El ID del libro es un parámetro obligatorio");
  } else if (typeof id !== 'string') {
    throw createHttpError(400, "El ID del libro no es válido");
  }

  const fullBook = await FullBookService.detail(id);
  res.status(200).json(fullBook);
}

export async function update(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  if (id == undefined) {
    throw createHttpError(400, "El ID del libro es un parámetro obligatorio");
  } else if (typeof id !== 'string') {
    throw createHttpError(400, "El ID del libro no es válido");
  }

  const fullBook = await FullBookService.update(id, req.body);
  res.status(200).json(fullBook);
}

// export async function destroy(req: Request, res: Response): Promise<void> {
//   const { id } = req.params;

// if (id == undefined) {
//   throw createHttpError(400, "El ID del libro es un parámetro obligatorio");
// } else if (typeof id !== 'string') {
//   throw createHttpError(400, "El ID del libro no es válido");
// }

//   const fullBook = await FullBookService.destroy();
//   res.status(204).send(fullBook);
// }
