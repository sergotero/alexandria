import createHttpError from "http-errors";
import * as SeriesRepository from "./../repositories/series.repository.js";
import type { Series, SeriesDTO, SeriesList } from "@shared/types";


export async function findOrCreate(data: Series | SeriesDTO): Promise<Series | never> {

  const series: SeriesDTO = {
    name: data.name!,
    volumes: Number(data.volumes),
    status: data.status!
  };

  const existing = await SeriesRepository.findByName(series.name!);

  if (existing.length !== 0) {
    return existing[0] as Series;
  }

  const result = await SeriesRepository.create(series);

  if (result.affectedRows === 0) {
    throw createHttpError(400, "Se ha producido un error al crear la nueva serie");
  }

  const newSeries = await detail(result.insertId.toString());

  return newSeries;
}

export async function list(): Promise<SeriesList[]> {
  const series = await SeriesRepository.findAll();
  return series;
}

export async function detail(id: string): Promise<Series> {
  const series = await SeriesRepository.findById(id);
  return series[0] as Series;
}

export async function update(id: string, data: Series): Promise<Series | never> {
  
  let series: SeriesDTO;
  
  if (data.name === null || data.status === null) {
    series = {
    volumes: Number(data.volumes),
  };
  } else {
    series = {
      name: data.name,
      volumes: Number(data.volumes),
      status: data.status
    };
  }

  const result = await SeriesRepository.findByIdAndUpdate(id, series);

  if (result.affectedRows === 0) {
    throw createHttpError(400, "Se ha producido un error durante la actualización de la serie");
  }

  const updatedSeries = await detail(id);

  return updatedSeries;
}

export async function destroy(id: string): Promise<true | never> {
  const series = await SeriesRepository.findByIdAndDelete(id);

  if (series.affectedRows === 0) {
    throw createHttpError(400, "Se ha producido un error durante el borrado de la serie");
  }

  return true;
}