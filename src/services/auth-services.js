import axios from "axios";

const http = axios.create({
  baseURL: ""
});

http.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export const register = (user) => http.post("/auth/register", user);

export const login = (user) => http.post("/auth/login", user);