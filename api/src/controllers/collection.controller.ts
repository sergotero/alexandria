import type { Request, Response } from "express";
import * as CollectionService from "./../services/collection-service.js";

export async function create(req: Request, res: Response): Promise<void> {
  const { name } = req.body;

  if (typeof name !== "string" || name === undefined) {
    throw new Error("Es necesario introducir un nombre válido");
  }

  const collection = await CollectionService.findOrCreate(name);
  res.status(201).json(collection);
}

export async function list(req: Request, res: Response): Promise<void> {
  const collections = await CollectionService.list();
  res.status(200).json(collections);
}

export async function detail(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  if (typeof id !== "string") {
    throw new Error("El ID de la colección no es válido");
  }

  const collection = await CollectionService.detail(id);
  res.status(200).json(collection);
}

export async function update(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const { name } = req.body;

  if (typeof id !== "string") {
    throw new Error("El ID de la colección no es válido");
  }

  const collection = await CollectionService.update(id, name);
  res.status(200).json(collection);
}

export async function destroy(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  if (typeof id !== "string") {
    throw new Error("El ID de la colección no es válido");
  }

  const collection = await CollectionService.destroy(id);
  res.status(204).send();
}
