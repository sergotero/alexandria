import type { APIResponse, Author, AuthorDTO } from "@shared/types";
import axios from "axios";


const http = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 5000
});

http.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export const list = async (): Promise<APIResponse<Author[]>> => await http.get(`/author`);

export const update = async(id: string, data: AuthorDTO): Promise<APIResponse<Author>> => await http.patch(`/author/${id}`, data);