import type { APIResponse, BooksCollections, BooksCollectionsDTO } from "@shared/types";
import axios from "axios";


const http = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 5000
});

http.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export const update = async (oldBookId: string, oldCollectionId: string, data: BooksCollectionsDTO): Promise<APIResponse<BooksCollections>> => await http.patch(`/bookscollections`, {bookId: oldBookId, collectionId: oldCollectionId, data});