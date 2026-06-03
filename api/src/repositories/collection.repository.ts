import type { Collection, SQLResponse } from "@shared/types";
import { query } from "../config/db-query.config.js";

export async function create(name: string): Promise<SQLResponse> {
  return await query("INSERT INTO collections (name) VALUE (?)", [name]);
}

export async function findAll(): Promise<Collection[]> {
  return await query("SELECT * FROM collections");
}

export async function findById(id: string): Promise<Collection[]> {
  return await query("SELECT * FROM collections WHERE id = ?", [id]);
}

export async function findByName(name: string): Promise<Collection[]> {
  return await query("SELECT * FROM collections WHERE name = ?", [name]);
}

export async function findByIdAndUpdate(id: string, collection: Collection): Promise<SQLResponse> {
  const fields: string[] = [];
  const values: (string | number)[] = [];

  if (collection?.name !== undefined) {
    fields.push("name = ?");
    values.push(collection.name);
  }

  values.push(id)

  return await query(`UPDATE collections SET ${fields.join(", ")} WHERE id = ?`, values);
}

export async function findByIdAndDelete(id: string): Promise<SQLResponse> {
  return await query(`DELETE FROM collections WHERE id = ?`, [id]);
}
