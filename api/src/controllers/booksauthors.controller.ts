import type { APIResponse, BooksAuthors } from '@shared/types';
import type { Request, Response } from "express"
import createHttpError from 'http-errors';
import * as BooksAuthorsService from "./../services/books-authors.service.js";

export const create = async (req: Request, res: Response): Promise<void | never> => {
  const { bookId, authorId } = req.body;

  if (bookId === undefined) {
    throw createHttpError(400, "El ID es un parámetro obligatorio");
  } else if (typeof bookId !== "string") {
    throw createHttpError(400, "El ID debe ser un string");
  }

  if (authorId === undefined) {
    throw createHttpError(400, "El ID es un parámetro obligatorio");
  } else if (typeof authorId !== "string") {
    throw createHttpError(400, "El ID debe ser un string");
  }

  const result = await BooksAuthorsService.findOrCreate(bookId, authorId);
  const response: APIResponse<BooksAuthors> = {
    success: true,
    data: result
  };

  res.status(200).json(response);
}

export const update = async(req: Request, res: Response): Promise<void | never> => {
  const oldBookId = req.body.bookId.toString();
  const oldAuthorkId = req.body.authorId.toString();
  const { data } = req.body

  if (oldBookId === undefined) {
    throw createHttpError(400, "El ID es un parámetro obligatorio");
  } else if (typeof oldBookId !== "string") {
    throw createHttpError(400, "El ID debe ser un string");
  }

  if (oldAuthorkId === undefined) {
    throw createHttpError(400, "El ID es un parámetro obligatorio");
  } else if (typeof oldAuthorkId !== "string") {
    throw createHttpError(400, "El ID debe ser un string");
  }

  const result = await BooksAuthorsService.update(oldBookId, oldAuthorkId, data);
  const response: APIResponse<BooksAuthors> = {
    success: true,
    data: result
  }
  res.status(200).json(response);
}

export async function destroy(req: Request, res: Response): Promise<void | never> {
  const { bookId, authorId } = req.body;

  if (bookId === undefined) {
    throw createHttpError(400, "El ID es un parámetro obligatorio");
  } else if (typeof bookId !== "string") {
    throw createHttpError(400, "El ID debe ser un string");
  }

  if (authorId === undefined) {
    throw createHttpError(400, "El ID es un parámetro obligatorio");
  } else if (typeof authorId !== "string") {
    throw createHttpError(400, "El ID debe ser un string");
  }

  const result = await BooksAuthorsService.destroy(bookId, authorId);
  const response: APIResponse<boolean> = {
    success: true,
    data: result
  };

  res.status(204).json(response);
}