import type { APIResponse, BooksCollections } from '@shared/types';
import type { Request, Response } from "express"
import createHttpError from 'http-errors';
import * as BooksCollectionsService from "./../services/books-collections.service.js";

export const create = async (req: Request, res: Response): Promise<void | never> => {
  const { bookId, collectionId } = req.body;
  const newBookId = Number(bookId);
  const newCollectionId = Number(collectionId);

  if (newBookId === undefined) {
    throw createHttpError(400, "El ID es un parámetro obligatorio");
  } else if (typeof newBookId !== "number") {
    throw createHttpError(400, "El ID debe ser un string");
  }

  if (newCollectionId === undefined) {
    throw createHttpError(400, "El ID es un parámetro obligatorio");
  } else if (typeof newCollectionId !== "number") {
    throw createHttpError(400, "El ID debe ser un string");
  }

  const result = await BooksCollectionsService.findOrCreate(newBookId, newCollectionId);
  const response: APIResponse<BooksCollections> = {
    success: true,
    data: result
  };

  res.status(200).json(response);
}

export const update = async(req: Request, res: Response): Promise<void | never> => {
  const { bookId, collectionId } = req.body;
  const oldBookId = Number(bookId);
  const oldCollectionId = Number(collectionId);
  const { data } = req.body

  if (oldBookId === undefined) {
    throw createHttpError(400, "El ID es un parámetro obligatorio");
  } else if (typeof oldBookId !== "number") {
    throw createHttpError(400, "El ID debe ser un string");
  }

  if (oldCollectionId === undefined) {
    throw createHttpError(400, "El ID es un parámetro obligatorio");
  } else if (typeof oldCollectionId !== "number") {
    throw createHttpError(400, "El ID debe ser un string");
  }

  const result = await BooksCollectionsService.update(oldBookId, oldCollectionId, data);
  const response: APIResponse<BooksCollections> = {
    success: true,
    data: result
  }
  res.status(200).json(response);
}

export async function destroy(req: Request, res: Response): Promise<void | never> {
  const { bookId, collectionId } = req.body;
  const newBookId = Number(bookId);
  const newCollectionId = Number(collectionId);

  if (newBookId === undefined) {
    throw createHttpError(400, "El ID es un parámetro obligatorio");
  } else if (typeof newBookId !== "number") {
    throw createHttpError(400, "El ID debe ser un string");
  }

  if (newCollectionId === undefined) {
    throw createHttpError(400, "El ID es un parámetro obligatorio");
  } else if (typeof newCollectionId !== "number") {
    throw createHttpError(400, "El ID debe ser un string");
  }

  const result = await BooksCollectionsService.destroy(newBookId, newCollectionId);
  const response: APIResponse<boolean> = {
    success: true,
    data: result
  };

  res.status(204).json(response);
}