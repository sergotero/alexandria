import axios from "axios";

const http = axios.create({
  baseURL: "https://apibooks.com"
});

http.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export const setReview = ({ review, user }) => http.post("/reviews", { review, user });