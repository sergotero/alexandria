import axios from "axios";

const CURRENT_KEY = "current_user";

//Originalmente tenía rutas absolutas, pero daban problemas de CORS. De acuerdo a ChatGPT funciona mejor con rutas absolutas porque así no hace saltar todo este tema.
const http = axios.create({
  baseURL: ""
});

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



export const setReview = (review, id) => http.post(`/books/${id}/reviews`, { review, id });

export const getReviews = (id) => http.get(`/books/${id}/reviews`);

