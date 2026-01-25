import { http, HttpResponse } from "msw";
import data from "../data/alexandria_final.json";

// const baseAPI = "https://alexandriabooks.com";

export const bookHandlers = [
  http.get(`/books`, async ({ request }) => {
    const url = new URL(request.url);
    const params = new URLSearchParams(url.search);
    const title = params.get("title");
    if (!title || title.trim() === "") {
      return HttpResponse.json(data, { status: 201 });
    } else {
      const books = data.filter((b) => b.titulo.toLowerCase().includes(title.toLowerCase()));
      return HttpResponse.json(books, { status: 200 });
    }
    //Paginación
    // const queryString = new URL(params.request.url).search
    // const qp = new URLSearchParams(queryString)
    // const page = +qp.get("page") || 0
    // const offset = 5

    // const partial = data.slice(
    //   page * offset,
    //   page * offset + offset
    // )
    }),
  http.get(`/books/:id`, ({ params }) => {
    const { id } = params;
    const book = data.filter((b) => b.id_libro === +id);
    return HttpResponse.json(book[0], { status: 200 });
  })
];