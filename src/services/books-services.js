import axios from "axios";

//Generate an axios instance with the base URL
const http = axios.create({
  baseURL: "https://apibooks.com"
});

//Intercept the response from Open Library API and only returns the items (books)
// http.interceptors.response.use(
//   (response) => response.data,
//   (error) => Promise.reject(error)
// );

export const getBooks = async () => {
  //The param projection is used to restrict the data of each Volume
  const response = await http.get(`/all`);
  const books = response.data;
  return books;
}