import createHttpError from "http-errors";
import * as CollectionRepository from "./../repositories/collection.repository.js";
import { capitalize } from "./utils.service.js";
import type { Collection, CollectionDTO } from "@shared/types";

export async function findOrCreate(data: CollectionDTO): Promise<Collection> {

  const existing = await CollectionRepository.findByName(data.name);

  if (existing.length !== 0) {
    return existing[0] as Collection;
  }

  const result = await CollectionRepository.create(data);

  if (result.affectedRows == 0) {
    throw createHttpError(400, "Se ha producido un error");
  }

  return await detail(result.insertId);
}

export async function list(): Promise<Collection[]> {
  const collections = await CollectionRepository.findAll();
  return collections;
}

export async function detail(id: number): Promise<Collection> {
  const collection = await CollectionRepository.findById(id);
  return collection[0] as Collection;
}

export async function update(id: number, data: CollectionDTO): Promise<Collection | never> {
  
  let newCollection: CollectionDTO; 
  if (data.colorCode === undefined) {
    newCollection = {
      name: capitalize(data.name)!,
    };
  } else {
    newCollection = {
      name: capitalize(data.name)!,
      colorCode: data.colorCode
    };
  }

  const result = await CollectionRepository.findByIdAndUpdate(id, newCollection);

  if (result.affectedRows === 0) {
    throw createHttpError(400, "Se ha producido un error durante la actualización");
  }

  return await detail(id);
}

export async function destroy(id: number): Promise<true | never> {
  const collection = await CollectionRepository.findByIdAndDelete(id);

  if (collection.affectedRows === 0){
    throw createHttpError(400, "Se ha producido un error durante el borrado de la colección");
  }

  return true;
}
