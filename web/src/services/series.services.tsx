import type { ApiError, APIResponse, Series, SeriesDTO, SeriesList } from "@shared/types";
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

export const create = async(data: SeriesDTO): Promise<APIResponse<Series>> => await http.post("/series", data);

export const list = async (): Promise<APIResponse<SeriesList[]>> => await http.get("/series");

export const detail = async(id: number): Promise<APIResponse<SeriesList>> => await http.get(`/series/${id}`);

export const update = async(id: number, data: SeriesList): Promise<APIResponse<Series>> => await http.patch(`/series/${id}`, data);

export const destroy = async(id: number): Promise<APIResponse<Series>> => http.delete(`/series/${id}`);