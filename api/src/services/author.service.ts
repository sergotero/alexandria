import createHttpError from "http-errors";
import type Author from "../models/author.model.js";
import * as AuthorRepository from "../repositories/author.repository.js";
import { capitalize } from "./utils.service.js";

export async function findOrCreate(data: Author): Promise<Author> {
  
  const name = capitalize(data.name!);
  const lastname1 = data.lastname1 === undefined ? null : capitalize(data.lastname1!);
  const lastname2 = data.lastname2 === undefined ? null : capitalize(data.lastname2!);
  const lastname3 = data.lastname3 === undefined ? null : capitalize(data.lastname3!);
  
  const author: Author = {
    name: name!,
    lastname1: lastname1,
    lastname2: lastname2,
    lastname3: lastname3,
  }
  
  const alias = `${author.name} ${author.lastname1 ?? ""} ${author.lastname2 ?? ""} ${author.lastname3 ?? ""}`.trim();
  
  const existing = await AuthorRepository.findByAlias(alias);

  if (existing.length !== 0) {
    return existing[0] as Author;
  }

  const result = await AuthorRepository.create(author);

  if (result.affectedRows === 0) {
    throw createHttpError(400, "Se ha producido un error");
  }

  author.id = Number(result.insertId);
  author.alias = alias;
  return author;
}

export async function list(): Promise<Author[]> {
  const authors = await AuthorRepository.findAll();
  return authors;
}

export async function detail(id: string): Promise<Author> {
  const author = await AuthorRepository.findById(id);
  return author[0] as Author;
}

export async function update(id: string, data: Author): Promise<Author | never> {
  
  const oldAuthor = await AuthorRepository.findById(id);

  if (Array.isArray(oldAuthor) && oldAuthor.length === 0) {
    throw createHttpError(404, "No existe este autor en la base de datos");
  }
  
  const name = capitalize(data.name!);
  const lastname1 = data?.lastname1 === undefined ? null : capitalize(data.lastname1!);
  const lastname2 = data?.lastname2 === undefined ? null : capitalize(data.lastname2!);
  const lastname3 = data?.lastname3 === undefined ? null : capitalize(data.lastname3!);

  const author: Author = {
    ...oldAuthor[0],
    name: name!,
    lastname1: lastname1,
    lastname2: lastname2,
    lastname3: lastname3,
    alias: `${name} ${lastname1 ?? ""} ${lastname2 ?? ""} ${lastname3 ?? ""}`.trim()
  }
  
  const result = await AuthorRepository.findByIdAndUpdate(id, author);
  
  if (result.affectedRows === 0) {
    throw createHttpError(400, "Se ha producido un error");
  }

  return author;
};

export async function destroy(id: string): Promise<true | never> {
  const result = await AuthorRepository.findByIdAndDelete(id);
  
  if (result.affectedRows === 0) {
    throw createHttpError(400, "Se ha producido un error");
  }

  return true;
}