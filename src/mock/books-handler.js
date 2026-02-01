import { http, HttpResponse } from "msw";
import data from "../data/alexandria_final.json";

const REVIEWS_KEY = "db_reviews";
const FAVORITES_KEY = "user_favorites";

// const favorites = localStorage.getItem(FAVORITES_KEY)? JSON.parse(localStorage.getItem(FAVORITES_KEY)) : [];
const storeFavorites = (favs) => localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));

export const bookHandlers = [
  http.get(`/books`, ({ request }) => {

    const url = new URL(request.url);
    const params = new URLSearchParams(url.search);
    const title = params.get("title");
    const page = params.get("page");
    const limit = params.get("limit");
    
    if (!title || title.trim() === "") {

      const offset = (+page * +limit) + +limit;
      const partial = data.slice((+page * +limit), +offset);
      return HttpResponse.json(partial, { status: 201 });

    } else {
      
      const books = data.filter((b) => b.titulo.toLowerCase().includes(title.toLowerCase()));
      return HttpResponse.json(books, { status: 200 });
    }
  }),
  http.get(`/books/years`, ({ request }) => {
    const reviews = localStorage.getItem(REVIEWS_KEY) ? JSON.parse(localStorage.getItem(REVIEWS_KEY)) : [];

    const url = new URL(request.url);
    const params = new URLSearchParams(url.search);
    const start = params.get("start");
    const end = params.get("end");

    const filteredReviews = reviews.filter((rev) => rev.date >= start && rev.date <= end);

    const filteredBooks = [];
    for (let i = 0; i < data.length; i++) {
      const book = data[i];
      for (let j = 0; j < filteredReviews.length; j++) {
        const reviewedBook = filteredReviews[j];
        if(+book.id_libro === +reviewedBook.id_libro){
          filteredBooks.push(book);
        }
      }
    }
    return HttpResponse.json(filteredBooks, {status: 200});
  }),
  http.get(`/books/:id`, ({ params }) => {
    const { id } = params;
    const book = data.filter((b) => b.id_libro === +id);
    return HttpResponse.json(book[0], { status: 200 });
  }),
  http.get(`/user/favorites`, () => {
    const favorites = localStorage.getItem(FAVORITES_KEY)? JSON.parse(localStorage.getItem(FAVORITES_KEY)) : [];
    console.log("Handler favs",favorites);
    
    return HttpResponse.json(favorites[0].books, { status: 200 });
  }),
  http.post(`/user/favorites`, async ({ request }) => {
    const req = await request.json();
    const userId = request.headers.get("x-user-id");
    const { books } = req;
    console.log("Req books", books);
    
    const favs = {
      "user": userId,
      "books": books
    };
    storeFavorites([favs]);
    
    return HttpResponse.json(favs, { status: 201 });
  }),
];