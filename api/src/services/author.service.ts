import createHttpError from "http-errors";
import * as AuthorRepository from "../repositories/author.repository.js";
import type { Author, AuthorDTO } from "@shared/types";

export async function create(data: AuthorDTO): Promise<Author | never> {

  const name = data.name;
  const lastname1 = (data.lastname1 === undefined || data.lastname1 === "")? null : data.lastname1;
  const lastname2 = (data.lastname2 === undefined || data.lastname2 === "")? null : data.lastname2;
  const lastname3 = (data.lastname3 === undefined || data.lastname3 === "")? null : data.lastname3;
  const alias = `${name} ${lastname1 ?? ""} ${lastname2 ?? ""} ${lastname3 ?? ""}`.trim();
  
  const author: AuthorDTO = {
    name,
    lastname1,
    lastname2,
    lastname3,
  }
  
  const existing = await AuthorRepository.findByAlias(alias);

  if (existing.length !== 0) {
    throw createHttpError(400, "El autor ya existe en la base de datos");
  }

  const result = await AuthorRepository.create(author);

  if (result.affectedRows === 0) {
    throw createHttpError(400, "Se ha producido un error");
  }

  return await detail(result.insertId);
}

export async function list(): Promise<Author[]> {
  return await AuthorRepository.findAll();
}

export async function detail(id: number): Promise<Author> {
  const author = await AuthorRepository.findById(id);
  return author[0] as Author;
}

export async function update(id: number, data: AuthorDTO): Promise<Author | never> {
  
  const oldAuthor = await AuthorRepository.findById(id);

  if (Array.isArray(oldAuthor) && oldAuthor.length === 0) {
    throw createHttpError(404, "No existe este autor en la base de datos");
  }
  
  const name = data.name!;
  const lastname1 = data?.lastname1 === undefined ? null : data.lastname1!;
  const lastname2 = data?.lastname2 === undefined ? null : data.lastname2!;
  const lastname3 = data?.lastname3 === undefined ? null : data.lastname3!;

  const author: AuthorDTO = {
    name: name!,
    lastname1: lastname1,
    lastname2: lastname2,
    lastname3: lastname3,
  }
  
  const result = await AuthorRepository.findByIdAndUpdate(id, author);
  
  if (result.affectedRows === 0) {
    throw createHttpError(400, "Se ha producido un error");
  }

  return await detail(id);
};

export async function destroy(id: number): Promise<true | never> {
  const result = await AuthorRepository.findByIdAndDelete(id);
  
  if (result.affectedRows === 0) {
    throw createHttpError(400, "Se ha producido un error");
  }

  return true;
}