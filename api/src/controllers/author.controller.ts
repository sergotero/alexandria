import type { Request, Response } from "express";
import * as AuthorService from "./../services/author-service.js";

//Controller: maneja solo HTTP y llama al servicio
export async function getAuthors(req: Request, res: Response) {
  const authors = await AuthorService.getAuthors();
  res.status(200).json(authors);
}