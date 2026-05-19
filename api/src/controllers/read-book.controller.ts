import type { Request, Response } from "express";
import * as ReadBookService from "./../services/read-book-service.js";
import createHttpError from "http-errors";

export async function create(req: Request, res: Response): Promise<void> {
  const readBook = await ReadBookService.create(req.body);
  res.status(201).json(readBook);
}

export async function list(req: Request, res: Response): Promise<void> {
  const readBooks = await ReadBookService.list();
  res.status(200).json(readBooks);
}

export async function detail(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  if (typeof id !== "string") {
    throw createHttpError(400, "El ID no es válido");
  }
  
  const readBook = await ReadBookService.detail(id);
  res.status(200).json(readBook);
}

export async function update(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  
  if (typeof id !== "string") {
    throw createHttpError(400, "El ID no es válido");
  }
  const readBook = await ReadBookService.update(id, req.body);
  res.status(200).json(readBook);
}

export async function destroy(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  if (typeof id !== "string") {
    throw createHttpError(400, "El ID no es válido");
  }

  const readBook = await ReadBookService.destroy(id);
  res.status(204).send();
}