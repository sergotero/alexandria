import type { Author, AuthorDTO, SQLResponse } from '@shared/types';
import { query } from '../config/db-query.config.js';

export async function create(author: AuthorDTO): Promise<SQLResponse> {
  
  const params = [
    author.name,
    author.lastname1!,
    author.lastname2!,
    author.lastname3!,
  ];

  return await query("INSERT INTO authors (name, lastname1, lastname2, lastname3) VALUES(?, ?, ?, ?)", params);
}

export async function findAll(): Promise<Author[]> {
  return await query("SELECT * FROM authors");
}

export async function findById(id: string): Promise<Author[]> {
  return await query("SELECT * FROM authors WHERE id = ?", [id]);
}

export async function findByAlias(alias: string): Promise<Author[]> {
  return await query("SELECT * FROM authors WHERE alias = ?", [alias]);
}

export async function findByIdAndUpdate(id: string, author: Author): Promise<SQLResponse> {
  
  const fields = [];
  const values = [];

  if (author.name !== undefined) {
    fields.push("name = ?");
    values.push(author.name);
  }

  if (author.lastname1 !== undefined) {
    fields.push("lastname1 = ?");
    values.push(author.lastname1);
  }

  if (author.lastname2 !== undefined) {
    fields.push("lastname2 = ?");
    values.push(author.lastname2);
  }

  if (author.lastname3 !== undefined) {
    fields.push("lastname3 = ?");
    values.push(author.lastname3);
  }

  values.push(id);

  const sql = `
    UPDATE authors
    SET ${fields.join(", ")}
    WHERE id = ?
  `;

  return await query(sql, values);
}

export async function findByIdAndDelete(id: string): Promise<SQLResponse> {
  return await query("DELETE FROM authors WHERE id = ?", [id]);
}
