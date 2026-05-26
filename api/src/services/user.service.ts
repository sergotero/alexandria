import createHttpError from "http-errors";
import bcrypt from "bcryptjs";
import type User from "../models/user.model.js";
import * as UserRepository from "./../repositories/user.repository.js";
import { capitalize } from "./utils.service.js";

export async function create(data: User): Promise<User> {
  const { email, password } = data;

  if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-z]{2,6}$/.test(email)) {
    throw createHttpError(400, "El email no tiene un formato válido");
  }

  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,15}$/.test(password)) {
    throw createHttpError(400, "La contraseña debe contener al menos una minúscula, una mayúscula, un número y un símbolo y debe tener entre 5 y 15 caracteres");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);

  const user: User = {
    name: capitalize(data.name)!,
    lastname1: capitalize(data?.lastname1!),
    lastname2: capitalize(data?.lastname2!),
    email,
    password: hashedPass,
    role: data.role
  }

  const result = await UserRepository.create(user);

  if (result.affectedRows === 0) {
    throw createHttpError(400, "Se ha producido un error durante la creación del usuario")
  }

  user.password = "******";

  return user;
}

export async function list(): Promise<User[]> {
  const users = await UserRepository.findAll();
  return users as User[];
}

export async function detail() {

}

export async function update() {

}

export async function destroy() {

}
