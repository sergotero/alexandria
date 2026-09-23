import type { APIResponse, FullBook, FullBookDTO } from "@shared/types";
import type { Request, Response } from "express";
import createHttpError from "http-errors";
import * as FullBookService from "../services/full-book.service.js";

export async function create(req: Request, res: Response): Promise<void> {
  const languages = ["Español", "Inglés", "Alemán", "Japonés"];
  const formats = ["Digital", "Impreso", "Ambos"];

  const { title, language, format, description, indexVolume: oldIndex, cover, cloudinaryId, authorId, seriesId, collectionId } = req.body;

    if (title === undefined) {
      throw createHttpError(400, "El título es un parámetro obligatorio");
    } else if (typeof title !== "string") {
      throw createHttpError(400, "El titulo debe ser un string");
    }
  
    if (language === undefined) {
      throw createHttpError(400, "El idioma es un parámetro obligatorio");
    } else if (typeof language !== "string" || !languages.includes(language)) {
      throw createHttpError(400, "El idioma no se encuentra definido en la base de datos");
    }
    
    if (format === undefined) {
      throw createHttpError(400, "El formato es un parámetro obligatorio");
    } else if (typeof req.body.format !== "string" || !formats.includes(format)) {
      throw createHttpError(400, "El formato no se encuentra definido en la base de datos");
    }

    if (authorId === undefined) {
      throw createHttpError(400, "El ID del autor es un parámetro obligatorio");
    } else if (typeof authorId !== "number") {
      throw createHttpError(400, "El tipado del ID debe ser un número");
    }
    
    if (collectionId === undefined) {
      throw createHttpError(400, "El ID de la colección es un parámetro obligatorio");
    } else if (typeof collectionId !== "number") {
      throw createHttpError(400, "El tipado del ID debe ser un número");
    }

    let indexVolume;
    if(isNaN(oldIndex)) {
      indexVolume = undefined;
    } else {
      indexVolume = oldIndex;
    }

  const fullbookDTO = {
    title, 
    language, 
    format, 
    description, 
    indexVolume, 
    cover, 
    cloudinaryId, 
    authorId, 
    seriesId, 
    collectionId
  }
  
  const fullbook = await FullBookService.create(fullbookDTO as FullBookDTO);
  const response: APIResponse<FullBook> = {
    success: true,
    data: fullbook
  };
  res.status(200).json(response);
}

export async function list(req: Request, res: Response): Promise<void> {
  const { page, limit } = req.query;
  const fullBooks = await FullBookService.list(Number(page), Number(limit));
  const response: APIResponse<FullBook[]> = {
    success: true,
    data: fullBooks
  };
  res.status(200).json(response);
}

export async function detail(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  if (id === undefined) {
    throw createHttpError(400, "El ID del libro es un parámetro obligatorio");
  } else if (typeof id !== 'string') {
    throw createHttpError(400, "El ID del libro no es válido");
  }

  const fullBook = await FullBookService.detail(Number(id));
  const response: APIResponse<FullBook> = {
    success: true,
    data: fullBook
  };
  res.status(200).json(response);
}

export async function update(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const newId = Number(id);
  
  if (newId === undefined) {
    throw createHttpError(400, "El ID del libro es un parámetro obligatorio");
  } else if (typeof newId !== 'number') {
    throw createHttpError(400, "El ID del libro no es válido");
  }

  const fullBook = await FullBookService.update(newId, req.body);
  const response: APIResponse<FullBook> = {
    success: true,
    data: fullBook
  };
  res.status(200).json(response);
}

export async function search(req: Request, res: Response): Promise<void> {
  const { title, author, collection, series, page, limit } = req.query;
  const newPage = Number(page);
  const newLimit = Number(limit);

  if (newPage !== undefined && typeof newPage === "number" && newLimit !== undefined && typeof newLimit === "number"){

    if (title !== undefined && typeof title === "string") {
      
      const fullbook = await FullBookService.findByTitle(title, newLimit, newPage);
      
      const response: APIResponse<FullBook[]> = {
        success: true,
        data: fullbook
      };
  
      res.status(200).json(response);
      return;
    };
  
    if (author !== undefined && typeof author === "string") {
      const fullbook = await FullBookService.findByAuthor(author, newLimit, newPage);
      const response: APIResponse<FullBook[]> = {
        success: true,
        data: fullbook
      };
  
      res.status(200).json(response);
      return;
    };
  
    if (collection !== undefined && typeof collection === "string") {
      const fullbook = await FullBookService.findByCollection(collection, newLimit, newPage);
      const response: APIResponse<FullBook[]> = {
        success: true,
        data: fullbook
      };
  
      res.status(200).json(response);
      return;
    };
  
    if (series !== undefined && typeof series === "string") {
      const fullbook = await FullBookService.findBySeries(series, newLimit, newPage);
      const response: APIResponse<FullBook[]> = {
        success: true,
        data: fullbook
      };
  
      res.status(200).json(response);
      return;
    };
  }


}