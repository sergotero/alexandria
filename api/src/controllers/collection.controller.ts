import createHttpError from "http-errors";
import type { Request, Response } from "express";
import * as CollectionService from "./../services/collection-service.js";

export async function create(req: Request, res: Response): Promise<void | never> {
  const { name } = req.body;

  if (name == undefined) {
    throw createHttpError(400, "El nombre es un parámetro obligatorio");
  } else if (typeof name !== "string") {
    throw createHttpError(400, "El nombre debe ser un string");
  }

  const collection = await CollectionService.findOrCreate(name);
  res.status(201).json(collection);
}

export async function list(req: Request, res: Response): Promise<void> {
  const collections = await CollectionService.list();
  res.status(200).json(collections);
}

export async function detail(req: Request, res: Response): Promise<void | never> {
  const { id } = req.params;

  if (id == undefined) {
    throw createHttpError(400, "El ID es un parámetro obligatorio");
  } else if (typeof id !== "string") {
    throw createHttpError(400, "El ID de la colección no es válido");
  }

  const collection = await CollectionService.detail(id);
  res.status(200).json(collection);
}

export async function update(req: Request, res: Response): Promise<void | never> {
  const { id } = req.params;

  if (id == undefined) {
    throw createHttpError(400, "El ID es un parámetro obligatorio");
  } else if (typeof id !== "string") {
    throw createHttpError(400, "El ID de la colección no es válido");
  }

  const collection = await CollectionService.update(id, req.body.name);
  res.status(200).json(collection);
}

export async function destroy(req: Request, res: Response): Promise<void | never> {
  const { id } = req.params;

  if (id == undefined) {
    throw createHttpError(400, "El ID es un parámetro obligatorio");
  } else if (typeof id !== "string") {
    throw createHttpError(400, "El ID de la colección no es válido");
  }

  const collection = await CollectionService.destroy(id);
  res.status(204).send(collection);
}
