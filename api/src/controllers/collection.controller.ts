import createHttpError from "http-errors";
import type { Request, Response } from "express";
import * as CollectionService from "./../services/collection.service.js";
import type { APIResponse, Collection } from "@shared/types";


export async function create(req: Request, res: Response): Promise<void | never> {
  const { name } = req.body;

  if (name == undefined) {
    throw createHttpError(400, "El nombre es un parámetro obligatorio");
  } else if (typeof name !== "string") {
    throw createHttpError(400, "El nombre debe ser un string");
  }

  const collection = await CollectionService.findOrCreate(name);
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

  if (id == undefined) {
    throw createHttpError(400, "El ID es un parámetro obligatorio");
  } else if (typeof id !== "string") {
    throw createHttpError(400, "El ID de la colección no es válido");
  }

  const collection = await CollectionService.detail(id);
  const response: APIResponse<Collection> = {
    success: true,
    data: collection
  };
  res.status(200).json(response);
}

export async function update(req: Request, res: Response): Promise<void | never> {
  const { id } = req.params;

  if (id == undefined) {
    throw createHttpError(400, "El ID es un parámetro obligatorio");
  } else if (typeof id !== "string") {
    throw createHttpError(400, "El ID de la colección no es válido");
  }

  const collection = await CollectionService.update(id, req.body.name);
  const response: APIResponse<Collection> = {
    success: true,
    data: collection
  };
  res.status(200).json(response);
}

export async function destroy(req: Request, res: Response): Promise<void | never> {
  const { id } = req.params;

  if (id == undefined) {
    throw createHttpError(400, "El ID es un parámetro obligatorio");
  } else if (typeof id !== "string") {
    throw createHttpError(400, "El ID de la colección no es válido");
  }

  const collection = await CollectionService.destroy(id);
  const response: APIResponse<true> = {
    success: true,
    data: collection
  };
  res.status(204).json(response);
}
