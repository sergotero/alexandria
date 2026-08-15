import type { APIResponse, FullBook } from "@shared/types";
import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 5000
});

http.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export const list = async (page: number, limit: number = 18): Promise<APIResponse<FullBook[]>> => await http.get(`/fullBook?page=${page}&limit=${limit}`);

export const detail = async(id: number): Promise<APIResponse<FullBook>> => await http.get(`/fullBook/${id}`);
