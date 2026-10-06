import type { ApiError, APIResponse, ExtendedReviewDTO, SimpleReview } from "@shared/types";
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

export const create = async(data: ExtendedReviewDTO): Promise<APIResponse<ExtendedReviewDTO>> => await http.post(`/readbook`, data);

export const update = async(id: number, data: SimpleReview): Promise<APIResponse<ExtendedReviewDTO>> => await http.patch(`/readbook/${id}`, data);

export const destroy = async(id: number): Promise<APIResponse<SimpleReview>> => http.delete(`/readbook/${id}`);