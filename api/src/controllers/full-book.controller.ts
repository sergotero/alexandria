import createHttpError from "http-errors";
import type { Request, Response } from "express";
import * as FullBookService from "../services/full-book.service.js";
import type { APIResponse } from "../types/api-responses.type.js";
import type FullBook from "../models/full-book.model.js";

export async function create(req: Request, res: Response): Promise<void> {
  const fullBook = await FullBookService.findOrCreate(req.body);
  const response: APIResponse<FullBook> = {
    success: true,
    data: fullBook
  };
  res.status(201).json(response);
}

export async function list(req: Request, res: Response): Promise<void> {
  const fullBooks = await FullBookService.list();
  const response: APIResponse<FullBook[]> = {
    success: true,
    data: fullBooks
  };
  res.status(200).json(response);
}

export async function detail(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  if (id == undefined) {
    throw createHttpError(400, "El ID del libro es un parámetro obligatorio");
  } else if (typeof id !== 'string') {
    throw createHttpError(400, "El ID del libro no es válido");
  }

  const fullBook = await FullBookService.detail(id);
  const response: APIResponse<FullBook> = {
    success: true,
    data: fullBook
  };
  res.status(200).json(response);
}

export async function update(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  if (id == undefined) {
    throw createHttpError(400, "El ID del libro es un parámetro obligatorio");
  } else if (typeof id !== 'string') {
    throw createHttpError(400, "El ID del libro no es válido");
  }

  const fullBook = await FullBookService.update(id, req.body);
  const response: APIResponse<FullBook> = {
    success: true,
    data: fullBook
  };
  res.status(200).json(response);
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
