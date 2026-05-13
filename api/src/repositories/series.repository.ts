import { query } from "../config/db-query.config.js";
import type Series from "../models/series.model.js";
import type SQLResponse from "../models/SQLResponse.js";

export async function create(series: Series): Promise<SQLResponse>{
  return await query("INSERT INTO series(name, total_vol, status) VALUES(?, ?, ?)", [series.name, series.volumes!, series.status]);
}

export async function findAll(): Promise<Series[]>{
  return await query("SELECT * FROM series");
}

export async function findById(id: string): Promise<Series[]>{
  return await query("SELECT * FROM series WHERE id = ?", [id]);
}

export async function findByName(name: string): Promise<Series[]>{
  return await query("SELECT * FROM series WHERE name = ?", [name]);
}

export async function findByIdAndUpdate(id: string, series: Series){
  
  const fields: string[] = [];
  const values: (string | number)[] = [];

  if (series.name !== undefined) {
    fields.push("name = ?");
    values.push(series.name);
  }

  if (series.volumes !== undefined) {
    fields.push("total_vol = ?");
    values.push(series.volumes);
  }

  if (series.status !== undefined) {
    fields.push("status = ?");
    values.push(series.status);
  }

  values.push(id);

  return await query(`UPDATE series SET ${fields.join(", ")} WHERE id = ?`, values);
}

export async function findByIdAndDelete(id: string): Promise<SQLResponse>{
  return await query("DELETE FROM series WHERE id = ?", [id]);
}
