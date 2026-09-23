import type { ApiError, APIResponse, Collection, CollectionDTO } from "@shared/types";
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

export const create = async (data: CollectionDTO): Promise<APIResponse<Collection>> => await http.post(`/collection`, data);

export const list = async (): Promise<APIResponse<Collection[]>> => await http.get("/collection");

// export const update = async (fullbook: FullBook, data: Collection): Promise<APIResponse<Collection>> => await http.patch(`/collection/${fullbook.collection.id}`, data);
