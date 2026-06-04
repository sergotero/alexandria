import createHttpError from "http-errors";
import * as CollectionRepository from "./../repositories/collection.repository.js";
import { capitalize } from "./utils.service.js";
import type { Collection } from "@shared/types";

export async function findOrCreate(name: string): Promise<Collection> {

  const existing = await CollectionRepository.findByName(name);

  if (existing.length !== 0) {
    return existing[0] as Collection;
  }

  const result = await CollectionRepository.create(capitalize(name)!);

  if (result.affectedRows == 0) {
    throw createHttpError(400, "Se ha producido un error");
  }

  const newCollection = await detail(result.insertId.toString());

  return newCollection;
}

export async function list(): Promise<Collection[]> {
  const collections = await CollectionRepository.findAll();
  return collections;
}

export async function detail(id: string): Promise<Collection> {
  const collection = await CollectionRepository.findById(id);
  return collection[0] as Collection;
}

export async function update(id: string, name: string): Promise<Collection | never> {
  
  const collection: Collection = {id: Number(id), name: capitalize(name)!}

  const result = await CollectionRepository.findByIdAndUpdate(id, collection);

  if (result.affectedRows === 0) {
    throw createHttpError(400, "Se ha producido un error durante la actualización");
  }

  return collection;
}

export async function destroy(id: string): Promise<true | never> {
  const collection = await CollectionRepository.findByIdAndDelete(id);

  if (collection.affectedRows === 0){
    throw createHttpError(400, "Se ha producido un error durante el borrado de la colección");
  }

  return true;
}
