import axios from "axios";

const http = axios.create({
  baseURL: "https://apibooks.com"
});

http.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export const logout = () => http.post("/auth", null);

export const login = (user) => http.post("/auth", user);

export const register = (user) => http.post("/users", user);