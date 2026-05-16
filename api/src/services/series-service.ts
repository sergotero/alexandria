import type Series from "../models/series.model.js";
import { capitalize } from "../services/utils-service.js";
import * as SeriesRepository from "./../repositories/series.repository.js";


export async function findOrCreate(data: Series): Promise<Series> {

  const series: Series = {
    name: capitalize(data.name),
    volumes: Number(data.volumes),
    status: data.status
  };

  const existing = await SeriesRepository.findByName(series.name);

  if (existing.length !== 0) {
    return existing[0] as Series;
  }

  const newSeries = await SeriesRepository.create(series);

  if (newSeries.affectedRows === 0) {
    throw new Error("Se ha producido un error al crear la nueva serie");
  }

  series.id = Number(newSeries.insertId);
  return series;
}

export async function list(): Promise<Series[]> {
  const series = await SeriesRepository.findAll();
  return series;
}

export async function detail(id: string): Promise<Series> {
  const series = await SeriesRepository.findById(id);
  return series[0] as Series;
}

export async function update(id: string, data: Series): Promise<Series | never> {
  
  const series: Series = {
    id: Number(id),
    name: capitalize(data.name),
    volumes: Number(data.volumes),
    status: data.status
  };

  const result = await SeriesRepository.findByIdAndUpdate(id, series);

  if (result.affectedRows === 0) {
    throw new Error("Se ha producido un error durante la actualización de la serie");
  }

  return series;
}

export async function destroy(id: string): Promise<boolean | never> {
  const series = await SeriesRepository.findByIdAndDelete(id);

  if (series.affectedRows === 0) {
    throw new Error("Se ha producido un error durante el borrado de la serie");
  }

  return true;
}