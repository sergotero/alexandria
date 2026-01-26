import { http, HttpResponse } from "msw";
import data from "../data/alexandria_final.json";

// const baseAPI = "https://alexandriabooks.com";

export const bookHandlers = [
  http.get(`/books`, ({ request }) => {

    const url = new URL(request.url);
    const params = new URLSearchParams(url.search);
    const title = params.get("title");
    const page = params.get("page");
    const limit = params.get("limit");
    
    if (!title || title.trim() === "") {

      const offset = (+page * +limit) + +limit;
      const partial = data.slice((page * +limit), offset);
      return HttpResponse.json(partial, { status: 201 });

    } else {
      
      const books = data.filter((b) => b.titulo.toLowerCase().includes(title.toLowerCase()));
      return HttpResponse.json(books, { status: 200 });
    }
    }),
  http.get(`/books/:id`, ({ params }) => {
    const { id } = params;
    const book = data.filter((b) => b.id_libro === +id);
    return HttpResponse.json(book[0], { status: 200 });
  })
];