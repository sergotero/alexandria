import type { APIResponse, Author } from '@shared/types';
import createHttpError from "http-errors";
import type { Request, Response } from "express";
import * as AuthorService from "../services/author.service.js";


export async function create(req: Request, res: Response): Promise<void | never> {
  const { name } = req.body;
  
  if (name === undefined) {
    throw createHttpError(400, "El nombre es un parámetro obligatorio");
  } else if (typeof name !== "string") {
    throw createHttpError(400, "El nombre debe ser un string");
  }

  const author = await AuthorService.create(req.body);
  const response: APIResponse<Author> = {
    success: true,
    data: author
  };
  res.status(201).json(response);
}

export async function list(req: Request, res: Response): Promise<void> {
  const authors = await AuthorService.list();
  const response: APIResponse<Author[]> = {
    success: true,
    data: authors
  };
  res.status(200).json(response);
}

export async function detail(req: Request, res: Response): Promise<void | never> {
  const { id } = req.params;
  const newId = Number(id);

  if (newId === undefined) {
    throw createHttpError(400, "El ID del autor es un parámetro obligatorio");
  } else if (typeof newId !== 'number') {
    throw createHttpError(400, "El ID del autor no es válido");
  }

  const author = await AuthorService.detail(newId);
  const response: APIResponse<Author> = {
    success: true,
    data: author
  };
  res.status(200).json(response);
}

export async function update(req: Request, res: Response): Promise<void | never> {
  const { id } = req.params;
  const newId = Number(id);

  if (newId === undefined) {
    throw createHttpError(400, "El ID del autor es un parámetro obligatorio");
  } else if (typeof newId !== 'number') {
    throw createHttpError(400, "El ID del autor no es válido");
  }

  const author = await AuthorService.update(newId, req.body);
  const response: APIResponse<Author> = {
    success: true,
    data: author
  };
  res.status(200).json(response);
}

export async function destroy(req: Request, res: Response): Promise<void | never> {
  const { id } = req.params;
  const newId = Number(id);

  if (newId === undefined) {
    throw createHttpError(400, "El ID del autor es un parámetro obligatorio");
  } else if (typeof newId !== 'number') {
    throw createHttpError(400, "El ID del autor no es válido");
  }

  const author = await AuthorService.destroy(newId);
  const response: APIResponse<true> = {
    success: true,
    data: author
  };
  res.status(200).json(response);
}