import type { Series, SeriesDTO, SeriesList, SQLResponse } from "@shared/types";
import { query } from "../config/db-query.config.js";


export async function create(series: SeriesDTO): Promise<SQLResponse>{
  return await query("INSERT INTO series(name, total_vol, status) VALUES(?, ?, ?)", [series.name!, series.volumes!, series.status!]);
}

export async function findAll(): Promise<SeriesList[]>{
  return await query("SELECT * FROM series ORDER BY name");
}

export async function findById(id: string): Promise<Series[]>{
  return await query("SELECT * FROM series WHERE id = ?", [id]);
}

export async function findByName(name: string): Promise<Series[]>{
  return await query("SELECT * FROM series WHERE name = ?", [name]);
}

export async function findByIdAndUpdate(id: string, series: SeriesDTO){
  
  const fields: string[] = [];
  const values: string[] = [];

  if (series.name !== undefined) {
    fields.push("name = ?");
    values.push(series.name!.toString());
  }

  if (series.volumes !== undefined) {
    fields.push("total_vol = ?");
    values.push(series.volumes!.toString());
  }

  if (series.status !== undefined) {
    fields.push("status = ?");
    values.push(series.status!.toString());
  }

  values.push(id);

  return await query(`UPDATE series SET ${fields.join(", ")} WHERE id = ?`, values);
}

export async function findByIdAndDelete(id: string): Promise<SQLResponse>{
  return await query("DELETE FROM series WHERE id = ?", [id]);
}
