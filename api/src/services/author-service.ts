import type Author from "../models/author.model.js";
import type SQLResponse from "../models/SQLResponse.js";
import * as AuthorRepository from "../repositories/author.repository.js";
import { capitalize } from "./utils-service.js";

export async function create(data: Record<string, string>): Promise<Author[]> {
  
  const name = capitalize(data.name!);
  const lastname1 = data?.lastname1 === undefined ? null : capitalize(data.lastname1);
  const lastname2 = data?.lastname2 === undefined ? null : capitalize(data.lastname2);
  const lastname3 = data?.lastname3 === undefined ? null : capitalize(data.lastname3);
  
  const author: Author = {
    name: name,
    lastname1: lastname1,
    lastname2: lastname2,
    lastname3: lastname3,
  }
  
  const alias = `${author.name} ${author.lastname1 ?? ""} ${author.lastname2 ?? ""} ${author.lastname3 ?? ""}`.trim();

  const checkAuthor = await AuthorRepository.findByAlias(alias);

  if (Array.isArray(checkAuthor) && checkAuthor.length !== 0) {
    throw new Error("El autor ya existe");
  }

  const result = await AuthorRepository.create(author);

  if (result.affectedRows === 0) {
    throw new Error("Se ha producido un error");
  }

  const newAuthor = await AuthorRepository.findByAlias(alias);

  return newAuthor;
}

export async function list(): Promise<Author[]> {
  const authors = await AuthorRepository.findAll();
  return authors;
}

export async function detail(id: string): Promise<Author[]> {
  const author = await AuthorRepository.findById(id);
  return author;
}

export async function update(id: string, data: Record<string, string>): Promise<Author[]> {
  
  const oldAuthor = await AuthorRepository.findById(id);

  if (Array.isArray(oldAuthor) && oldAuthor.length === 0) {
    throw new Error("No existe este autor en la base de datos");
  }
  
  const name = capitalize(data.name!);
  const lastname1 = data?.lastname1 === undefined ? null : capitalize(data.lastname1);
  const lastname2 = data?.lastname2 === undefined ? null : capitalize(data.lastname2);
  const lastname3 = data?.lastname3 === undefined ? null : capitalize(data.lastname3);

  const newAuthor: Author = {
    ...oldAuthor[0],
    name: name,
    lastname1: lastname1,
    lastname2: lastname2,
    lastname3: lastname3,
    alias: `${name} ${lastname1 ?? ""} ${lastname2 ?? ""} ${lastname3 ?? ""}`.trim()
  }
  
  const result = await AuthorRepository.findByIdAndUpdate(id, newAuthor);
  
  if (result.affectedRows === 0) {
    throw new Error("Se ha producido un error");
  }

  const updatedAuthor = await AuthorRepository.findByAlias(newAuthor.alias!);

  return updatedAuthor;
};

export async function destroy(id: string): Promise<SQLResponse> {
  const result = await AuthorRepository.findByIdAndDelete(id);
  
  if (result.affectedRows === 0) {
    throw new Error("Se ha producido un error");
  }

  return result;
}