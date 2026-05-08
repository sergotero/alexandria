import type Author from "./../models/author.model.js";
import { query } from '../config/db-query.config.js';

// export async function create(data: Author): Promise<Author> {

// }

export async function findAll(): Promise<Author> {
  return await query("SELECT alias FROM authors");
}

// export async function findById(id: number): Promise<Author> {

// }

// export async function findByIdAndUpdate(id: number): Promise<Author> {

// }

// export async function findByIdAndDelete(id: number): Promise<Author> {

// }
