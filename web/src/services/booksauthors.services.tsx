import type { ApiError, APIResponse, BooksAuthors, BooksAuthorsDTO } from "@shared/types";
import axios, { AxiosError } from "axios";


const http = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 5000
});

http.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError<ApiError>) => {
    const apiError = error.response?.data;

    if (apiError) {
      return Promise.reject(apiError);
    }

    return Promise.reject({
      success: false,
      error: {
        message: "No se ha podido conectar con el servidor",
        statusCode: 0
      }
    } satisfies ApiError);
  }
);

export const update = async(bookId: string, authorId: string, data: BooksAuthorsDTO): Promise<APIResponse<BooksAuthors>> => await http.patch('/booksauthors',{bookId, authorId, data});

