import createHttpError from "http-errors";
import type { Request, Response } from "express";
import * as SeriesService from "./../services/series.service.js";
import type { APIResponse, Series, SeriesList } from "@shared/types";


export async function create(req: Request, res: Response): Promise<void | never> {
  const statuses = ["Abierta", "Cerrada", "Desconocido"];

  const { name, volumes, status } = req.body;

  if (name === undefined) {
    throw createHttpError(400, "El título es un parámetro obligatorio");
  } else if (typeof name !== "string") {
    throw createHttpError(400, "El tipado del titulo no es válido");
  }

  if (volumes === undefined) {
    throw createHttpError(400, "El número de volúmenes es un parámetro obligatorio");
  } else if (typeof volumes !== "number") {
    throw createHttpError(400, "El tipado de volúmenes no es válido");
  }
  
  if (status === undefined) {
    throw createHttpError(400, "El estado es un parámetro obligatorio");
  } else if (typeof status !== "string" && !statuses.includes(status)) {
    throw createHttpError(400, "El tipado del estado no es válido o el estado no se encuentra definido en la base de datos");
  }

  const series = await SeriesService.findOrCreate({name, volumes, status});
  const response: APIResponse<Series> = {
    success: true,
    data: series
  };
  res.status(200).json(response);
}

export async function list(req: Request, res: Response): Promise<void | never> {
  const series = await SeriesService.list();
  const response: APIResponse<SeriesList[]> = {
    success: true,
    data: series
  };
  res.status(200).json(response);
}

export async function detail(req: Request, res: Response): Promise<void | never> {
  const { id } = req.params;
  const newId = Number(id);

  if (newId === undefined) {
    throw createHttpError(400, "El ID de la serie es un parámetro obligatorio");
  } else if (typeof newId !== 'number') {
    throw createHttpError(400, "El tipado del ID de la serie no es válido");
  }
  
  const series = await SeriesService.detail(newId);
  const response: APIResponse<Series> = {
    success: true,
    data: series
  };
  res.status(200).json(response);
}

export async function update(req: Request, res: Response): Promise<void | never> {
  const statuses = ["Abierta", "Cerrada", "Desconocido"];
  const { id } = req.params;
  const {name, volumes, status } = req.body;
  const newId = Number(id);

  if (newId === undefined) {
    throw createHttpError(400, "El ID de la serie es un parámetro obligatorio");
  } else if (typeof newId !== 'number') {
    throw createHttpError(400, "El ID de la serie no es válido");
  }

  if (name === undefined) {
    throw createHttpError(400, "El nombre de la serie es un parámetro obligatorio");
  } else if (typeof name !== 'string') {
    throw createHttpError(400, "El tipado del nombre de la serie no es válido");
  }

  if (volumes === undefined) {
    throw createHttpError(400, "Los volúmenes de la serie son un parámetro obligatorio");
  } else if (typeof volumes !== 'number') {
    throw createHttpError(400, "El tipado de los volúmenes de la serie no es válido");
  }

  if (status === undefined) {
    throw createHttpError(400, "El estado es un parámetro obligatorio");
  } else if (typeof status !== "string" && !statuses.includes(status)) {
    throw createHttpError(400, "El tipado del estado no es válido o el estado no se encuentra definido en la base de datos");
  }

  const series = await SeriesService.update(newId, {id: newId, name, volumes, status});
  const response: APIResponse<Series> = {
    success: true,
    data: series
  };
  res.status(200).json(response);
}

export async function destroy(req: Request, res: Response): Promise<void | never> {
  const { id } = req.params;
  const newId = Number(id);

  if (newId === undefined) {
    throw createHttpError(400, "El ID de la serie es un parámetro obligatorio");
  } else if (typeof newId !== 'number') {
    throw createHttpError(400, "El ID de la serie no es válido");
  }

  const series = await SeriesService.destroy(newId);
  const response: APIResponse<true> = {
    success: true,
    data: series
  };
  res.status(204).json(response);
}

