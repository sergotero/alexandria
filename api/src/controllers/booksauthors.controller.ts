import type { APIResponse, BooksAuthors } from '@shared/types';
import type { Request, Response } from "express"
import createHttpError from 'http-errors';
import * as BooksAuthorsService from "./../services/books-authors.service.js";

export const create = async (req: Request, res: Response): Promise<void | never> => {
  const { bookId, authorId, indexVolume } = req.body;
  const newBookId = Number(bookId);
  const newAuthorId = Number(authorId);

  if (newBookId === undefined) {
    throw createHttpError(400, "El ID es un parámetro obligatorio");
  } else if (typeof newBookId !== "number") {
    throw createHttpError(400, "El ID debe ser un string");
  }

  if (newAuthorId === undefined) {
    throw createHttpError(400, "El ID es un parámetro obligatorio");
  } else if (typeof newAuthorId !== "number") {
    throw createHttpError(400, "El ID debe ser un string");
  }

  const result = await BooksAuthorsService.createLink(newBookId, newAuthorId, indexVolume);
  const response: APIResponse<BooksAuthors> = {
    success: true,
    data: result
  };

  res.status(200).json(response);
}

export const update = async(req: Request, res: Response): Promise<void | never> => {
  const oldBookId = Number(req.body.bookId);
  const oldAuthorkId = Number(req.body.authorId);
  const { data } = req.body

  if (oldBookId === undefined) {
    throw createHttpError(400, "El ID es un parámetro obligatorio");
  } else if (typeof oldBookId !== "number") {
    throw createHttpError(400, "El ID debe ser un string");
  }

  if (oldAuthorkId === undefined) {
    throw createHttpError(400, "El ID es un parámetro obligatorio");
  } else if (typeof oldAuthorkId !== "number") {
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
  const newBookId = Number(bookId);
  const newAuthorId = Number(authorId);

  if (newBookId === undefined) {
    throw createHttpError(400, "El ID es un parámetro obligatorio");
  } else if (typeof newBookId !== "number") {
    throw createHttpError(400, "El ID debe ser un string");
  }

  if (newAuthorId === undefined) {
    throw createHttpError(400, "El ID es un parámetro obligatorio");
  } else if (typeof newAuthorId !== "number") {
    throw createHttpError(400, "El ID debe ser un string");
  }

  const result = await BooksAuthorsService.destroy(newBookId, newAuthorId);
  const response: APIResponse<boolean> = {
    success: true,
    data: result
  };

  res.status(204).json(response);
}