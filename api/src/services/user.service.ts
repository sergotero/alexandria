import createHttpError from "http-errors";
import type User from "../models/user.model.js";
import * as UserRepository from "./../repositories/user.repository.js";
import { capitalize, encryptPassword } from "./utils.service.js";

export async function create(data: User): Promise<Omit<User, "password"> | never> {
  const { email, password } = data;

  if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-z]{2,6}$/.test(email)) {
    throw createHttpError(400, "El email no tiene un formato válido");
  }

  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,15}$/.test(password)) {
    throw createHttpError(400, "La contraseña debe contener al menos una minúscula, una mayúscula, un número y un símbolo y debe tener entre 5 y 15 caracteres");
  }

  const existing = await UserRepository.findByEmail(data.email);
  if (existing.length !== 0) {
    throw createHttpError(400, "El usuario ya existe en la base de datos");
  }

  const hashedPass = await encryptPassword(data.password);
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
    throw createHttpError(400, "Se ha producido un error durante la creación del usuario");
  }
  
  user.id = result.insertId!;
  const {password: pass, ...newUser} = user;

  return newUser;
}

export async function list(): Promise<User[]> {
  const users = await UserRepository.findAll();
  return users as User[];
}

export async function detail(id: string) {
  const user = await UserRepository.findById(id);
  return user[0] as User;
}

export async function update(id: string, data: any): Promise<Omit<User, "password"> | never> {

  if (data.name !== undefined) {
    data.name = capitalize(data.name);
  }

  if (data.lastname1 !== undefined) {
    data.lastname1 = capitalize(data.lastname1);
  }

  if (data.lastname2 !== undefined) {
    data.lastname2 = capitalize(data.lastname2);
  }

  if (data.email !== undefined && !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-z]{2,6}$/.test(data.email)) {
    throw createHttpError(400, "El email no tiene un formato válido");
  }
  
  if (data.password !== undefined && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,15}$/.test(data.password)) {
    data.password = await encryptPassword(data.password);
  } else {
    throw createHttpError(400, "La contraseña debe contener al menos una minúscula, una mayúscula, un número y un símbolo y debe tener entre 5 y 15 caracteres");
  }
  
  if (data.role !== undefined) {
    data.role = capitalize(data.role);
  }

  const result = await UserRepository.findByIdAndUpdate(id, data);
  
  if (result.affectedRows === 0) {
    throw createHttpError(400, "Se ha producido un error durante la actualización");
  }

  const user = await detail(id);
  const {password: pass, ...newUser} = user;
  return newUser;
}

export async function destroy(id: string) : Promise<true | never>{
  const user = await UserRepository.findByIdAndDelete(id);

  if (user.affectedRows === 0) {
    throw createHttpError(400, "Se ha producido un error durante la eliminación");
  }

  return true;
}

export async function register(){
  
}

export async function login() {

}

export async function logout() {

}
