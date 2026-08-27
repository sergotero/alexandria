import type { APIResponse, BooksAuthors, BooksAuthorsDTO } from "@shared/types";
import axios from "axios";


const http = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 5000
});

http.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export const update = async(bookId: string, authorId: string, data: BooksAuthorsDTO): Promise<APIResponse<BooksAuthors>> => await http.patch('/booksauthors',{bookId, authorId, data});

