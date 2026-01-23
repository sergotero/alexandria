import axios from "axios";

//Generate an axios instance with the base URL
const http = axios.create({
  baseURL: "https://apibooks.com"
});

//Intercept the responses from any API and only returns only the data
http.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export const getBooks = (page, limit, offset) => http.get(`/books?page=${page}&limit=${limit}&offset=${offset}`);

export const getDetails = (id) => http.get(`/details/${id}`);

export const getSearch = (params) => http.get(`/books/search?${params}`);