import { http, HttpResponse } from "msw";
import data from "../data/alexandria_final.json";

const baseAPI = "https://apibooks.com";

export const bookHandlers = [
  http.get(`${baseAPI}/books`, async (params) => {
    // const queryString = new URL(params.request.url).search
    // const qp = new URLSearchParams(queryString)
    // const page = +qp.get("page") || 0
    // const offset = 5

    // const partial = data.slice(
    //   page * offset,
    //   page * offset + offset
    // )
  
    return HttpResponse.json(data, { status: 201 });
  }),
  http.get(`${baseAPI}/details/:id`, async ({ params }) => {
    const { id } = params;
    const book = data.filter((b) => b.id_libro === +id);
    return HttpResponse.json(book[0], { status: 201 });
  }),
  http.get(`${baseAPI}/books/search`, async ({ request }) => {
    const url = new URL(request.url);
    const params = new URLSearchParams(url.search);
    const titulo = params.get("titulo");
    const book = data.filter((b) => b.titulo.toLowerCase().includes(titulo.toLowerCase()));
    return HttpResponse.json(book, { status: 201 });
  })
];