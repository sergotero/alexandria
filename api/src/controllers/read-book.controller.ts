import type { Request, Response } from "express";
import * as ReadBookService from "./../services/read-book.service.js";
import createHttpError from "http-errors";
import type { APIResponse, ExtendedReview } from "@shared/types";

export async function create(req: Request, res: Response): Promise<void> {

  const { bookId, authorId, readingDate, score, comments, completed  } = req.body;

  if (bookId === undefined) {
    throw createHttpError(400, "El ID es un parámetro obligatorio");
  } else if(typeof bookId !== "number") {
    throw createHttpError(400, "El tipado del ID no es válido");
  }

  if (authorId === undefined) {
    throw createHttpError(400, "El ID es un parámetro obligatorio");
  } else if(typeof authorId !== "number") {
    throw createHttpError(400, "El tipado del ID no es válido");
  }

  if (readingDate === undefined) {
    throw createHttpError(400, "La fecha es un parámetro obligatorio");
  } else if(typeof readingDate !== "string") {
    throw createHttpError(400, "El formato de la fecha no es válido");
  }

  if (score === undefined) {
    throw createHttpError(400, "La puntuación es un parámetro obligatorio");
  } else if(typeof score !== "number") {
    throw createHttpError(400, "El formato de la puntuación no es válido");
  }

  if (comments === undefined) {
    throw createHttpError(400, "El comentario es un parámetro obligatorio");
  } else if(typeof comments !== "string") {
    throw createHttpError(400, "El formato del comentario no es válido");
  }

  if (completed === undefined) {
    throw createHttpError(400, "El checkbox es un parámetro obligatorio");
  } else if(typeof completed !== "boolean") {
    throw createHttpError(400, "El formato del checkbox no es válido");
  }

  const date = new Date(readingDate);

  const readBook = await ReadBookService.create({bookId, authorId, readingDate: date, score, comments, completed});
  const response: APIResponse<ExtendedReview> = {
    success: true,
    data: readBook
  };
  res.status(201).json(response);
}

export async function list(req: Request, res: Response): Promise<void> {
  const readBooks = await ReadBookService.list();
  const response: APIResponse<ExtendedReview[]> = {
    success: true,
    data: readBooks
  };
  res.status(200).json(response);
}

export async function detail(req: Request, res: Response): Promise<void | never> {
  const { id } = req.params;
  const newId = Number(id);

  if ((newId === undefined)) {
    throw createHttpError(400, "El ID no es válido");
  } else if(typeof newId !== "number") {
    throw createHttpError(400, "El tipado del ID no es válido");
  }
  
  const readBook = await ReadBookService.detail(newId);
  const response: APIResponse<ExtendedReview> = {
    success: true,
    data: readBook
  };
  res.status(200).json(response);
}

export async function update(req: Request, res: Response): Promise<void | never> {
  const { id } = req.params;
  const { readingDate, score, comments, completed  } = req.body;

  const newId = Number(id);

  if ((newId === undefined)) {
    throw createHttpError(400, "El ID no es válido");
  } else if(typeof newId !== "number") {
    throw createHttpError(400, "El tipado del ID no es válido");
  }

  if (readingDate === undefined) {
    throw createHttpError(400, "La fecha es un parámetro obligatorio");
  } else if(typeof readingDate !== "string") {
    throw createHttpError(400, "El formato de la fecha no es válido");
  }

  if (score === undefined) {
    throw createHttpError(400, "La puntuación es un parámetro obligatorio");
  } else if(typeof score !== "number") {
    throw createHttpError(400, "El formato de la puntuación no es válido");
  }

  if (comments === undefined) {
    throw createHttpError(400, "El comentario es un parámetro obligatorio");
  } else if(typeof comments !== "string") {
    throw createHttpError(400, "El formato del comentario no es válido");
  }

  if (completed === undefined) {
    throw createHttpError(400, "El checkbox es un parámetro obligatorio");
  } else if(typeof completed !== "boolean") {
    throw createHttpError(400, "El formato del checkbox no es válido");
  }

  const date = new Date(readingDate);

  const readBook = await ReadBookService.update(newId, { id: newId, readingDate: date, score, comments, completed});
  const response: APIResponse<ExtendedReview> = {
    success: true,
    data: readBook
  };
  res.status(200).json(response);
}

export async function destroy(req: Request, res: Response): Promise<void | never> {
  const { id } = req.params;
  const newId = Number(id);

  if ((newId === undefined)) {
    throw createHttpError(400, "El ID no es válido");
  } else if(typeof newId !== "number") {
    throw createHttpError(400, "El tipado del ID no es válido");
  }

  const readBook = await ReadBookService.destroy(newId);
  const response: APIResponse<true> = {
    success: true,
    data: readBook
  };
  res.status(204).json(response);
}