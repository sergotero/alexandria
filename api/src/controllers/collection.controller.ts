import createHttpError from "http-errors";
import type { Request, Response } from "express";
import * as CollectionService from "./../services/collection.service.js";
import type { APIResponse, Collection, CollectionDTO } from "@shared/types";


export async function create(req: Request, res: Response): Promise<void | never> {
  const { name, colorCode } = req.body;

  if (name === undefined) {
    throw createHttpError(400, "El nombre es un parámetro obligatorio");
  } else if (typeof name !== "string") {
    throw createHttpError(400, "El nombre debe ser un string");
  }
  

  if (colorCode === undefined) {
    throw createHttpError(400, "El código de color es un parámetro obligatorio");
  } else if (typeof colorCode !== "string") {
    throw createHttpError(400, "El código de color debe ser un string");
  } else if (!/^\#{1}[a-fA-F0-9]{6}$/.test(colorCode)) {
    throw createHttpError(400, "El código de color debe ser un valor hexadecimal");
  } 

  const newCollection: CollectionDTO = { name, colorCode };

  const collection = await CollectionService.findOrCreate(newCollection);
  const response: APIResponse<Collection> = {
    success: true,
    data: collection
  };
  res.status(201).json(response);
}

export async function list(req: Request, res: Response): Promise<void> {
  const collections = await CollectionService.list();
  const response: APIResponse<Collection[]> = {
    success: true,
    data: collections
  };
  res.status(200).json(response);
}

export async function detail(req: Request, res: Response): Promise<void | never> {
  const { id } = req.params;
  const newId = Number(id);

  if (newId === undefined) {
    throw createHttpError(400, "El el ID de la colección es un parámetro obligatorio");
  } else if (typeof newId !== 'number') {
    throw createHttpError(400, "El el ID de la colección no es válido");
  }

  const collection = await CollectionService.detail(newId);
  const response: APIResponse<Collection> = {
    success: true,
    data: collection
  };
  res.status(200).json(response);
}

export async function update(req: Request, res: Response): Promise<void | never> {
  const { id } = req.params;
  const newId = Number(id);

  if (newId === undefined) {
    throw createHttpError(400, "El el ID de la colección es un parámetro obligatorio");
  } else if (typeof newId !== 'number') {
    throw createHttpError(400, "El el ID de la colección no es válido");
  }

  const collection = await CollectionService.update(newId, req.body);
  const response: APIResponse<Collection> = {
    success: true,
    data: collection
  };
  res.status(200).json(response);
}

export async function destroy(req: Request, res: Response): Promise<void | never> {
  const { id } = req.params;
  const newId = Number(id);

  if (newId === undefined) {
    throw createHttpError(400, "El el ID de la colección es un parámetro obligatorio");
  } else if (typeof newId !== 'number') {
    throw createHttpError(400, "El tipado del ID de la colección no es válido");
  }

  const collection = await CollectionService.destroy(newId);
  const response: APIResponse<true> = {
    success: true,
    data: collection
  };
  res.status(204).json(response);
}
