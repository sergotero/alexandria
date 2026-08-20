import type { APIResponse, BooksSeries } from '@shared/types';
import type { Request, Response } from "express"
import createHttpError from 'http-errors';
import * as BooksSeriesService from "./../services/books-series.service.js";

export const create = async (req: Request, res: Response): Promise<void | never> => {
  const { bookId, seriesId } = req.body;

  if (bookId === undefined) {
    throw createHttpError(400, "El ID es un parámetro obligatorio");
  } else if (typeof bookId !== "string") {
    throw createHttpError(400, "El ID debe ser un string");
  }

  if (seriesId === undefined) {
    throw createHttpError(400, "El ID es un parámetro obligatorio");
  } else if (typeof seriesId !== "string") {
    throw createHttpError(400, "El ID debe ser un string");
  }

  const result = await BooksSeriesService.findOrCreate(bookId, seriesId);
  const response: APIResponse<BooksSeries> = {
    success: true,
    data: result
  };

  res.status(200).json(response);
}

export const update = async(req: Request, res: Response): Promise<void | never> => {
  const oldBookId = req.body.bookId.toString();
  const oldAuthorkId = req.body.seriesId.toString();
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

  const result = await BooksSeriesService.update(oldBookId, oldAuthorkId, data);
  const response: APIResponse<BooksSeries> = {
    success: true,
    data: result
  }
  res.status(200).json(response);
}

export async function destroy(req: Request, res: Response): Promise<void | never> {
  const { bookId, seriesId } = req.body;

  if (bookId === undefined) {
    throw createHttpError(400, "El ID es un parámetro obligatorio");
  } else if (typeof bookId !== "string") {
    throw createHttpError(400, "El ID debe ser un string");
  }

  if (seriesId === undefined) {
    throw createHttpError(400, "El ID es un parámetro obligatorio");
  } else if (typeof seriesId !== "string") {
    throw createHttpError(400, "El ID debe ser un string");
  }

  const result = await BooksSeriesService.destroy(bookId, seriesId);
  const response: APIResponse<boolean> = {
    success: true,
    data: result
  };

  res.status(204).json(response);
}