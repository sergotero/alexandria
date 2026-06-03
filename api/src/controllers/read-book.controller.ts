import type { Request, Response } from "express";
import * as ReadBookService from "./../services/read-book.service.js";
import createHttpError from "http-errors";
import type { APIResponse, ReadBook } from "@shared/types";

export async function create(req: Request, res: Response): Promise<void> {
  const readBook = await ReadBookService.create(req.body);
  const response: APIResponse<ReadBook> = {
    success: true,
    data: readBook
  };
  res.status(201).json(response);
}

export async function list(req: Request, res: Response): Promise<void> {
  const readBooks = await ReadBookService.list();
  const response: APIResponse<ReadBook[]> = {
    success: true,
    data: readBooks
  };
  res.status(200).json(response);
}

export async function detail(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  if (typeof id !== "string") {
    throw createHttpError(400, "El ID no es válido");
  }
  
  const readBook = await ReadBookService.detail(id);
  const response: APIResponse<ReadBook> = {
    success: true,
    data: readBook
  };
  res.status(200).json(response);
}

export async function update(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  
  if (typeof id !== "string") {
    throw createHttpError(400, "El ID no es válido");
  }
  const readBook = await ReadBookService.update(id, req.body);
  const response: APIResponse<ReadBook> = {
    success: true,
    data: readBook
  };
  res.status(200).json(response);
}

export async function destroy(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  if (typeof id !== "string") {
    throw createHttpError(400, "El ID no es válido");
  }

  const readBook = await ReadBookService.destroy(id);
  const response: APIResponse<true> = {
    success: true,
    data: readBook
  };
  res.status(204).json(response);
}