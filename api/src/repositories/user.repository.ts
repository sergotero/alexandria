import { query } from "../config/db-query.config.js";
import type User from "../models/user.model.js";
import type SQLResponse from "../models/SQLResponse.js";


export async function create(data: User): Promise<SQLResponse>{
  const { name, lastname1, lastname2, email, password, role } = data;
  return await query(`INSERT INTO users (name, lastname1, lastname2, email, password, role)VALUES (?, ?, ?, ?, ?, ?)`, [name, lastname1!, lastname2!, email, password, role]);
}

export async function findAll(): Promise<User[]>{
  return await query(`SELECT name, lastname1, lastname2, email, role FROM users`);
}

export async function findById(id: string): Promise<User[]>{
  return await query(`SELECT * FROM users WHERE id = ?`, [id]);
}

export async function findByEmail(email: string): Promise<User[]>{
  return await query(`SELECT * FROM users WHERE email = ?`, [email]);
}

export async function findByIdAndUpdate(id: string, data: any){
  const fields: string[] = [];
  const values: string[] = [];

  if (data.name !== undefined) {
    fields.push("name = ?");
    values.push(data.name);
  }

  if (data.lastname1 !== undefined) {
    fields.push("lastname1 = ?");
    values.push(data.lastname1);
  }

  if (data.lastname2 !== undefined) {
    fields.push("lastname2 = ?");
    values.push(data.lastname2);
  }

  if (data.email !== undefined) {
    fields.push("email = ?");
    values.push(data.email);
  }

  if (data.password !== undefined) {
    fields.push("password = ?");
    values.push(data.password);
  }

  if (data.role !== undefined) {
    fields.push("role = ?");
    values.push(data.role);
  }

  values.push(id);

  return await query(`UPDATE users SET ${fields.join(", ")} WHERE id = ?`, values);
}

export async function findByIdAndDelete(id: string): Promise<SQLResponse>{
  return await query(`DELETE FROM users WHERE id = ?`, [id]);
}
