import type { ApiError, APIResponse, BooksCollections, BooksCollectionsDTO } from "@shared/types";
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

export const update = async (oldBookId: string, oldCollectionId: string, data: BooksCollectionsDTO): Promise<APIResponse<BooksCollections>> => await http.patch(`/bookscollections`, {bookId: oldBookId, collectionId: oldCollectionId, data});