import type { Collection, CollectionDTO, SQLResponse, SQLValue } from "@shared/types";
import { query } from "../config/db-query.config.js";
import { batch } from "../config/db-batch.config.js";
import type { UpsertResult } from "mariadb";

export async function create(data: CollectionDTO): Promise<SQLResponse> {
  return await query("INSERT INTO collections (name, color_code) VALUES (?, ?)", [data.name, data.colorCode!]);
}

export async function findAll(): Promise<Collection[]> {
  return await query("SELECT id, name, color_code as colorCode FROM collections");
}

export async function findById(id: number): Promise<Collection[]> {
  return await query("SELECT * FROM collections WHERE id = ?", [id]);
}

export async function findByName(name: string): Promise<Collection[]> {
  return await query("SELECT * FROM collections WHERE name = ?", [name]);
}

export async function findByIdAndUpdate(id: number, collection: CollectionDTO): Promise<SQLResponse> {
  const fields: string[] = [];
  const values: SQLValue[] = [];

  if (collection?.name !== undefined) {
    fields.push("name = ?");
    values.push(collection.name);
  }

  if (collection?.colorCode !== undefined) {
    fields.push("color_code = ?");
    values.push(collection.colorCode);
  }

  values.push(id)

  return await query(`UPDATE collections SET ${fields.join(", ")} WHERE id = ?`, values);
}

export async function findByIdAndUpdateAll(data: (string|number)[][]): Promise<void> {
  return await batch(`UPDATE collections SET name = ?, color_code = ? WHERE id = ?`, data);
}

export async function findByIdAndDelete(id: number): Promise<SQLResponse> {
  return await query(`DELETE FROM collections WHERE id = ?`, [id]);
}
