import createHttpError from "http-errors";
import type { Request, Response } from "express";
import * as SeriesService from "./../services/series.service.js";
import type { APIResponse, Series } from "@shared/types";


export async function create(req: Request, res: Response): Promise<void | never> {
  const statuses = ["Abierta", "Cerrada", "Desconocido"];

  const { name, volumes, status } = req.body;

  if (name == undefined) {
    throw createHttpError(400, "El título es un parámetro obligatorio");
  } else if (typeof name !== "string") {
    throw createHttpError(400, "El titulo no es válido");
  }

  if (volumes == undefined) {
    throw createHttpError(400, "El número de volúmenes es un parámetro obligatorio");
  } else if (typeof volumes !== "string") {
    throw createHttpError(400, "El número de volúmenes no es válido");
  }
  
  if (status == undefined) {
    throw createHttpError(400, "El estado es un parámetro obligatorio");
  } else if (typeof req.body.format !== "string" || !statuses.includes(status)) {
    throw createHttpError(400, "El estado no es válido o no se encuentra definido en la base de datos");
  }

  const series = await SeriesService.findOrCreate(req.body);
  const response: APIResponse<Series> = {
    success: true,
    data: series
  };
  res.status(200).json(response);
}

export async function list(req: Request, res: Response): Promise<void | never> {
  const series = await SeriesService.list();
  const response: APIResponse<Series[]> = {
    success: true,
    data: series
  };
  res.status(200).json(response);
}

export async function detail(req: Request, res: Response): Promise<void | never> {
  const { id } = req.params;

  if (id == undefined) {
    throw createHttpError(400, "El ID de la serie es un parámetro obligatorio");
  } else if (typeof id !== 'string') {
    throw createHttpError(400, "El ID de la serie no es válido");
  }
  
  const series = await SeriesService.detail(id);
  const response: APIResponse<Series> = {
    success: true,
    data: series
  };
  res.status(200).json(response);
}

export async function update(req: Request, res: Response): Promise<void | never> {
  const { id } = req.params;

  if (id == undefined) {
    throw createHttpError(400, "El ID de la serie es un parámetro obligatorio");
  } else if (typeof id !== 'string') {
    throw createHttpError(400, "El ID de la serie no es válido");
  }

  const series = await SeriesService.update(id, req.body);
  const response: APIResponse<Series> = {
    success: true,
    data: series
  };
  res.status(200).json(response);
}

export async function destroy(req: Request, res: Response): Promise<void | never> {
  const { id } = req.params;

  if (id == undefined) {
    throw createHttpError(400, "El ID de la serie es un parámetro obligatorio");
  } else if (typeof id !== 'string') {
    throw createHttpError(400, "El ID de la serie no es válido");
  }

  const series = await SeriesService.destroy(id);
  const response: APIResponse<true> = {
    success: true,
    data: series
  };
  res.status(204).json(series);
}

