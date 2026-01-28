import axios from "axios";

//Generate an axios instance with the base URL
const http = axios.create();

//Intercept the responses from any API and only returns only the data
http.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export const getDetails = (id) => http.get(`/books/${id}`);

export const getBooks = (title, page = 0, limit = 33) => http.get(`/books`, {params: { title, page, limit }});

export const getBooksByYear = (start, end) => http.get(`/books/years`, {params: {start, end}});