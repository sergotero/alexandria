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

export const list = async (): Promise<APIResponse<FullBook[]>> => await http.get("/fullBook");

export const detail = async(id: number) => await http.get(`/fullBook/${id}`);
