import type { APIResponse, BooksSeries, BooksSeriesDTO } from "@shared/types";
import axios from "axios";


const http = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 5000
});

http.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);


export const update = async(oldBookId: string, oldSeriesId: string | null | undefined, data: BooksSeriesDTO): Promise<APIResponse<BooksSeries>> => http.patch(`/booksseries`, {bookId: oldBookId, seriesId: oldSeriesId, data});

export const destroy = async(data: BooksSeriesDTO): Promise<APIResponse<BooksSeries>> => http.delete(`/booksseries`, { data });
