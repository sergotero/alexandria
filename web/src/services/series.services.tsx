import type { APIResponse, SeriesList } from "@shared/types";
import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 5000
});

http.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export const list = async (): Promise<APIResponse<SeriesList[]>> => await http.get("/series");