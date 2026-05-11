import type Author from "../models/author.model.js";
import type SQLResponse from "../models/SQLResponse.js";
import * as AuthorRepository from "./../repositories/author-repository.js";
import { capitalize } from "./utils-service.js";

export async function create(data: Record<string, string>) {
  
  const name = capitalize(data.name!);
  const lastName1 = data?.lastname1 === undefined ? null : capitalize(data.lastname1);
  const lastName2 = data?.lastname2 === undefined ? null : capitalize(data.lastname2);
  const lastName3 = data?.lastname3 === undefined ? null : capitalize(data.lastname3);
  
  const author: Author = {
    name: name,
    lastname1: lastName1,
    lastname2: lastName2,
    lastname3: lastName3,
    alias: function (){
      return `${this.name} ${this.lastname1 ?? ""} ${this.lastname2 ?? ""} ${this.lastname3 ?? ""}`.trim();
    }
  }
  
  const checkAuthor = await AuthorRepository.findByAlias(author.alias());

  if (Array.isArray(checkAuthor) && checkAuthor.length !== 0) {
    throw new Error("El autor ya existe");
  }

  const result = await AuthorRepository.create(author);

  if (result.affectedRows === 0) {
    throw new Error("Se ha producido un error");
  }

  const newAuthor = await AuthorRepository.findByAlias(author.alias());

  return newAuthor;
}

export async function list() {
  const authors = await AuthorRepository.findAll();
  return authors;
}

export async function detail(id: string) {
  const author = await AuthorRepository.findById(id);
  return author;
}

export async function update(id: string, data: Record<string, string>) {
  
  const author = await AuthorRepository.findById(id);
  const a: Author = author[0];
  const updatedAuthor = {
    ...a,
    name: data?.name,
    lastname1: data?.lastname1,
    lastname2: data?.lastname2,
    lastname3: data?.lastname3,
    alias: function() {
      return `${this.name} ${this.lastname1 ?? ""} ${this.lastname2 ?? ""} ${this.lastname3 ?? ""}`.trim();
    }
  }
    console.log("Actualizado: ", updatedAuthor);
    // const result = AuthorRepository.findByIdAndUpdate(id, updatedActor)
};