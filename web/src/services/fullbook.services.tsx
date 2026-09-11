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

export const list = async (page: number = 0, limit: number = 18): Promise<APIResponse<FullBook[]>> => await http.get(`/fullbook?page=${page}&limit=${limit}`);

export const detail = async(id: number): Promise<APIResponse<FullBook>> => await http.get(`/fullbook/${id}`);

export const findByTitle = async (title: string, page: number = 0, limit: number = 18): Promise<APIResponse<FullBook[]>> => await http.get(`/search?title=${title}&page=${page}&limit=${limit}`);

export const findByAuthor = async (alias: string, page: number = 0, limit: number = 18): Promise<APIResponse<FullBook[]>> => {
  return await http.get(`/search?author=${alias}&page=${page}&limit=${limit}`)};

export const findByCollection = async (name: string, page: number = 0, limit: number = 18): Promise<APIResponse<FullBook[]>> => await http.get(`/search?collection=${name}&page=${page}&limit=${limit}`);

export const findBySeries = async (name: string, page: number = 0, limit: number = 18): Promise<APIResponse<FullBook[]>> => await http.get(`/search?series=${name}&page=${page}&limit=${limit}`);
