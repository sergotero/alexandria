import type { APIResponse, BooksSeries } from '@shared/types';
import type { Request, Response } from "express"
import createHttpError from 'http-errors';
import * as BooksSeriesService from "./../services/books-series.service.js";

export const create = async (req: Request, res: Response): Promise<void | never> => {
  const { bookId, seriesId } = req.body;
  const newBookId = Number(bookId);
  const newSeriesId = Number(seriesId);

  if (newBookId === undefined) {
    throw createHttpError(400, "El ID es un parámetro obligatorio");
  } else if (typeof newBookId !== "number") {
    throw createHttpError(400, "El ID debe ser un string");
  }

  if (newSeriesId === undefined) {
    throw createHttpError(400, "El ID es un parámetro obligatorio");
  } else if (typeof newSeriesId !== "number") {
    throw createHttpError(400, "El ID debe ser un string");
  }

  const result = await BooksSeriesService.createLink(newBookId, newSeriesId);
  const response: APIResponse<BooksSeries> = {
    success: true,
    data: result
  };

  res.status(200).json(response);
}

export const update = async(req: Request, res: Response): Promise<void | never> => {
  const oldBookId = Number(req.body.bookId);
  const oldSeriesId = Number(req.body.seriesId);
  const { data } = req.body

  if (oldBookId === undefined) {
    throw createHttpError(400, "El ID es un parámetro obligatorio");
  } else if (typeof oldBookId !== "number") {
    throw createHttpError(400, "El ID debe ser un string");
  }

  if (data.bookId === undefined) {
    throw createHttpError(400, "El nuevo ID es un parámetro obligatorio");
  }

  if (data.seriesId === undefined) {
    throw createHttpError(400, "El nuevo ID es un parámetro obligatorio");
  }

  const result = await BooksSeriesService.update(oldBookId, oldSeriesId, data);
  const response: APIResponse<BooksSeries> = {
    success: true,
    data: result
  }
  res.status(200).json(response);
}

export async function destroy(req: Request, res: Response): Promise<void | never> {
  const { bookId, seriesId } = req.body;
  const newBookId = Number(bookId);
  const newSeriesId = Number(seriesId);

  if (newBookId === undefined) {
    throw createHttpError(400, "El ID es un parámetro obligatorio");
  } else if (typeof newBookId !== "number") {
    throw createHttpError(400, "El ID debe ser un string");
  }

  if (newSeriesId === undefined) {
    throw createHttpError(400, "El ID es un parámetro obligatorio");
  } else if (typeof newSeriesId !== "number") {
    throw createHttpError(400, "El ID debe ser un string");
  }

  const result = await BooksSeriesService.destroy(newBookId, newSeriesId);
  const response: APIResponse<boolean> = {
    success: true,
    data: result
  };

  res.status(204).json(response);
}