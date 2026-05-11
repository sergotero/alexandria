import type { Request, Response } from "express";
import * as AuthorService from "./../services/author-service.js";

export async function create(req: Request, res: Response) {
  const author = await AuthorService.create(req.body);

  res.status(201).json(author);
}

export async function list(req: Request, res: Response) {
  const authors = await AuthorService.list();
  res.status(200).json(authors);
}

export async function detail(req: Request, res: Response) {
  const { id } = req.params;

  if (typeof id !== 'string') {
    return res.status(400).json({ error: "ID de autor no válido" });
  }
  const author = await AuthorService.detail(id);
  res.status(200).json(author);
}

export async function update(req: Request, res: Response) {
  const { id } = req.params;
  
  if (typeof id !== 'string') {
    return res.status(400).json({ error: "ID de autor no válido" });
  }
  
  const result = await AuthorService.update(id, req.body);
  
  res.status(200).json(result);
}