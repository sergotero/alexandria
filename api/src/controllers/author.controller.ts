import createHttpError from "http-errors";
import type { Request, Response } from "express";
import * as AuthorService from "../services/author-service.js";

export async function create(req: Request, res: Response): Promise<void | never> {
  const { name } = req.params;
  
  if (name == undefined) {
    throw createHttpError(400, "El nombre es un parámetro obligatorio");
  } else if (typeof name !== "string") {
    throw createHttpError(400, "El nombre debe ser un string");
  }

  const author = await AuthorService.findOrCreate(req.body);
  res.status(201).json(author);
}

export async function list(req: Request, res: Response): Promise<void> {
  const authors = await AuthorService.list();
  res.status(200).json(authors);
}

export async function detail(req: Request, res: Response): Promise<void | never> {
  const { id } = req.params;

  if (id == undefined) {
    throw createHttpError(400, "El ID del autor es un parámetro obligatorio");
  } else if (typeof id !== 'string') {
    throw createHttpError(400, "El ID del autor no es válido");
  }

  const author = await AuthorService.detail(id);
  res.status(200).json(author);
}

export async function update(req: Request, res: Response): Promise<void | never> {
  const { id } = req.params;
  
  if (id == undefined) {
    throw createHttpError(400, "El ID del autor es un parámetro obligatorio");
  } else if (typeof id !== 'string') {
    throw createHttpError(400, "El ID del autor no es válido");
  }
  
  const result = await AuthorService.update(id, req.body);
  
  res.status(200).json(result);
}

export async function destroy(req: Request, res: Response): Promise<void | never> {
  const { id } = req.params;

  if (id == undefined) {
    throw createHttpError(400, "El ID del autor es un parámetro obligatorio");
  } else if (typeof id !== 'string') {
    throw createHttpError(400, "El ID del autor no es válido");
  }

  const result = await AuthorService.destroy(id);
  res.status(204).send(result);
}