import type { APIResponse, FullBook, FullBookDTO } from "@shared/types";
import type { Request, Response } from "express";
import createHttpError from "http-errors";
import * as FullBookService from "../services/full-book.service.js";

export async function create(req: Request, res: Response): Promise<void> {
  const fullBook = await FullBookService.findOrCreate(req.body);
  const response: APIResponse<FullBookDTO> = {
    success: true,
    data: fullBook
  };
  res.status(201).json(response);
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