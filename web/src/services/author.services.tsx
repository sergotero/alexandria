import type { ApiError, APIResponse, Author, AuthorDTO } from "@shared/types";
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

export const list = async (): Promise<APIResponse<Author[]>> => await http.get(`/author`);

export const update = async(id: string, data: AuthorDTO): Promise<APIResponse<Author>> => await http.patch(`/author/${id}`, data);