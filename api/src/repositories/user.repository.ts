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

export async function findById(id: string): Promise<User>{
  return await query(`SELECT * FROM users WHERE id = ?`, [id]);
}

export async function findByEmail(email: string): Promise<User>{
  return await query(`SELECT * FROM users WHERE email = ?`, [email]);
}

export async function findByIdAndUpdate(){

}

export async function findByIdAndDelete(){

}
