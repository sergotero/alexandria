import type { ApiError, APIResponse, User, UserDTO } from "@shared/types";
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

export const register = async (data: UserDTO): Promise<APIResponse<User>> => await http.post(`/user`, data);

export const login = async (data: UserDTO): Promise<APIResponse<User>> => await http.post(`/access/login`, data);

// export const logout = async(): Promise<APIResponse<void>> => await http.post(`/access/logout`, data);
