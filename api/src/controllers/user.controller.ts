import type { Request, Response } from "express";
import createHttpError from "http-errors";
import type User from "../models/user.model.js";
import * as UserService from "./../services/user.service.js";
import type { APIResponse } from "../types/api-responses.type.js";

export async function create(req: Request, res: Response): Promise<void> {
  const { name, email, password, role } = req.body;
  if (name === undefined) {
    throw createHttpError(400, "El nombre es un parámetro obligatorio");
  } else if (typeof name !== "string") {
    throw createHttpError(400, "El nombre debe ser un string");
  }

  if (email === undefined) {
    throw createHttpError(400, "El email es un parámetro obligatorio");
  } else if (typeof email !== "string") {
    throw createHttpError(400, "El email debe ser un string");
  }

  if (password === undefined) {
    throw createHttpError(400, "El password es un parámetro obligatorio");
  } else if (typeof password !== "string") {
    throw createHttpError(400, "El password debe ser un string");
  }

  if (role === undefined) {
    throw createHttpError(400, "El rol es un parámetro obligatorio");
  } else if (typeof role !== "string") {
    throw createHttpError(400, "El rol debe ser un string");
  }

  const user = await UserService.create(req.body);
  const response: APIResponse<User> = {
    success: true,
    data: user
  };
  res.status(201).json(response);
}

export async function list(req: Request, res: Response): Promise<void> {
  const users = await UserService.list();
  const response: APIResponse<User[]> = {
    success: true,
    data: users
  };
  res.status(200).json(response);
}

export async function detail(req: Request, res: Response): Promise<void> {

}

export async function update(req: Request, res: Response): Promise<void> {

}

export async function destroy(req: Request, res: Response): Promise<void> {

}
