import type BaseRepositoryInterface from "../interfaces/base-repository-interface.js";
import Author from "../models/author.model.js";
import { query } from './../config/mariadb-query.config.js';

//importar pool de MariaDB

class AuthorRepository implements BaseRepositoryInterface {
  
  constructor(private readonly query: object) {
  }

  async create(data: Author): Promise<Author> {

  }

  async findAll(): Promise<Author> {
    return await query("SELECT id, name, lastName1, lastName2, lastName3, alias FROM authors");
  }

  async findById(id: number): Promise<Author> {

  }

  async findByIdAndUpdate(id: number): Promise<Author> {

  }

  async findByIdAndDelete(id: number): Promise<Author> {

  }

}