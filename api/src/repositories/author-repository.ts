import type Author from "./../models/author.model.js";
import type SQLResponse from "../models/SQLResponse.js";
import { query } from '../config/db-query.config.js';

export async function create(author: Author): Promise<SQLResponse> {
  
  const params = [
    author.name,
    author.lastName1!,
    author.lastName2!,
    author.lastName3!,
    author.alias()
  ];

  return await query("INSERT INTO authors (name, lastname1, lastname2, lastname3, alias) VALUES(?, ?, ?, ?, ?)", params);
}

export async function findAll(): Promise<Author[] | string[]> {
  return await query("SELECT * FROM authors");
}

export async function findById(id: string): Promise<Author[] | string[]> {
  return await query("SELECT * FROM authors WHERE id = ?", [id]);
}

export async function findByAlias(alias: string): Promise<Author[] | string[]> {
  return await query("SELECT * FROM authors WHERE alias = ?", [alias]);
}

export async function findByIdAndUpdate(id: string, data: Author): Promise<SQLResponse> {
  return await query("UPDATE authors SET name = ?, lastname1 = ?, lastname2 = ?, lastname3 = ?, alias = ? WHERE id = ?", []);
}

// export async function findByIdAndDelete(id: number): Promise<Author> {

// }
