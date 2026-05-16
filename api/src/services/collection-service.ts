import * as CollectionRepository from "./../repositories/collection.repository.js";
import type Collection from "../models/collection.model.js";
import { capitalize } from "./utils-service.js";

export async function findOrCreate(name: string): Promise<Collection | never> {
  
  const collection: Collection = { name: capitalize(name) };

  const existing = await CollectionRepository.findByName(name);

  if (existing.length !== 0) {
    return existing[0] as Collection;
  }

  const result = await CollectionRepository.create(capitalize(name));
  
  collection.id = Number(result.insertId);

  return collection;
}

export async function list(): Promise<Collection[]> {
  const collections = await CollectionRepository.findAll();
  return collections;
}

export async function detail(id: string): Promise<Collection[]> {
  const collection = await CollectionRepository.findById(id);
  return collection;
}

export async function update(id: string, name: string): Promise<Collection | never> {
  
  const collection: Collection = {id: Number(id), name: capitalize(name)}

  const result = await CollectionRepository.findByIdAndUpdate(id, collection);

  if (result.affectedRows === 0) {
    throw new Error("La colección no se ha actualizado debido a un problema");
  }

  return collection;
}

export async function destroy(id: string): Promise<boolean | never> {
  const collection = await CollectionRepository.findByIdAndDelete(id);

  if (collection.affectedRows === 0){
    throw new Error("Se ha producido un error durante el borrado de la colección");
  }

  return true;
}
