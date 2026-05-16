import type { Request, Response } from "express";
import * as FullBookService from "./../services/full-book-service.js";


export async function create(req: Request, res: Response) {
  const fullBook = await FullBookService.findOrCreate(req.body);  
  res.status(201).json(fullBook);
}


export async function list(req: Request, res: Response) {
  const fullBooks = await FullBookService.list();
  res.status(200).json(fullBooks);
}


export async function detail(req: Request, res: Response) {
  const { id } = req.params;

  if (typeof id !== "string") {
    throw new Error("El ID no es válido");
  }

  const fullBook = await FullBookService.detail(id);
  res.status(200).json(fullBook);
}


export async function update(req: Request, res: Response) {

}


export async function destroy(req: Request, res: Response) {

}
