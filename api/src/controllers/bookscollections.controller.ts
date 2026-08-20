import type { APIResponse, BooksCollections } from '@shared/types';
import type { Request, Response } from "express"
import createHttpError from 'http-errors';
import * as BooksCollectionsService from "./../services/books-collections.service.js";

export const create = async (req: Request, res: Response): Promise<void | never> => {
  const { bookId, collectionId } = req.body;

  if (bookId === undefined) {
    throw createHttpError(400, "El ID es un parámetro obligatorio");
  } else if (typeof bookId !== "string") {
    throw createHttpError(400, "El ID debe ser un string");
  }

  if (collectionId === undefined) {
    throw createHttpError(400, "El ID es un parámetro obligatorio");
  } else if (typeof collectionId !== "string") {
    throw createHttpError(400, "El ID debe ser un string");
  }

  const result = await BooksCollectionsService.findOrCreate(bookId, collectionId);
  const response: APIResponse<BooksCollections> = {
    success: true,
    data: result
  };

  res.status(200).json(response);
}

export const update = async(req: Request, res: Response): Promise<void | never> => {
  const oldBookId = req.body.bookId.toString();
  const oldAuthorkId = req.body.collectionId.toString();
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

  const result = await BooksCollectionsService.update(oldBookId, oldAuthorkId, data);
  const response: APIResponse<BooksCollections> = {
    success: true,
    data: result
  }
  res.status(200).json(response);
}

export async function destroy(req: Request, res: Response): Promise<void | never> {
  const { bookId, collectionId } = req.body;

  if (bookId === undefined) {
    throw createHttpError(400, "El ID es un parámetro obligatorio");
  } else if (typeof bookId !== "string") {
    throw createHttpError(400, "El ID debe ser un string");
  }

  if (collectionId === undefined) {
    throw createHttpError(400, "El ID es un parámetro obligatorio");
  } else if (typeof collectionId !== "string") {
    throw createHttpError(400, "El ID debe ser un string");
  }

  const result = await BooksCollectionsService.destroy(bookId, collectionId);
  const response: APIResponse<boolean> = {
    success: true,
    data: result
  };

  res.status(204).json(response);
}