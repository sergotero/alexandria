import type { APIResponse, BookBase } from "@shared/types";
import axios from "axios";


const http = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 5000
});

http.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export const update = async (id: number, data: FormData): Promise<APIResponse<BookBase>> => await http.patch(`/bookbase/${id}`, data);
