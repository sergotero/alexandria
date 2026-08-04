import type { APIResponse, Collection } from "@shared/types";
import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 5000
});

http.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export const list = async (): Promise<APIResponse<Collection[]>> => await http.get("/collection");