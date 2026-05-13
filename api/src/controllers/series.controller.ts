import type { Request, Response } from "express";
import * as SeriesService from "./../services/series-service.js";

export async function create(req: Request, res: Response): Promise<void | never> {

  const { name, volumes, status } = req.body;

  if (typeof name === undefined || typeof volumes === undefined || typeof status === undefined) {
    throw new Error("Es necesario introducir el nombre de la serie, sus volúmenes y el estatus.");
  }

  const series = await SeriesService.create({name, volumes, status});
  res.status(200).json(series);
}

export async function list(req: Request, res: Response): Promise<void | never> {
  const series = await SeriesService.list();
  res.status(200).json(series);
}

export async function detail(req: Request, res: Response): Promise<void | never> {
  const { id } = req.params;

  if (typeof id !== "string") {
    throw new Error("El ID no es válido");
  }
  
  const series = await SeriesService.detail(id);
  res.status(200).json(series);
}

export async function update(req: Request, res: Response): Promise<void | never> {
  const { id } = req.params;
  const { name, volumes, status } = req.body;

  if (typeof id !== "string") {
    throw new Error("El ID no es válido");
  }

  if (typeof name === undefined || typeof volumes === undefined || typeof status === undefined) {
    throw new Error("Es necesario introducir el nombre de la serie, sus volúmenes y el estatus.");
  }

  const series = await SeriesService.update(id, {name, volumes, status});
  res.status(200).json(series);
}

export async function destroy(req: Request, res: Response): Promise<void | never> {
  const { id } = req.params;

  if (typeof id !== "string") {
    throw new Error("El ID no es válido");
  }
  const series = await SeriesService.destroy(id);
  res.status(204).send();
}

