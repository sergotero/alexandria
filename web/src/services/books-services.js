import axios from "axios";

const CURRENT_KEY = "current_user";

//Generate an axios instance with the base URL
const http = axios.create();

//Intercept the responses from any API and only returns only the data
http.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

//Este interceptor es necesario para añadir user a la cabecera (de otra manera no se captura)
http.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem(CURRENT_KEY));
  if (user?.id) {
    config.headers.set('x-user-id', user.id);
  }
  return config;
});

export const getDetails = (id) => http.get(`/books/${id}`);

export const getBooks = (title, filter, page = 0, limit = 33) => http.get(`/books`, {params: { title, filter, page, limit }});

export const getBooksByYear = (start, end) => http.get(`/books/years`, {params: {start, end}});

export const getCategories = () => http.get(`/books/categories`);

export const getFavorites = () => http.get(`/user/favorites`);

export const setFavorites = (books) => http.post(`/user/favorites`, { books });

export const getRandomQuote = () => http.get("https://dummyjson.com/quotes/random");