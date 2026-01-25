import { http, HttpResponse } from "msw";

const REVIEWS_KEY = "db_reviews";

const reviews = (localStorage.getItem(REVIEWS_KEY)) ? JSON.parse(localStorage.getItem(REVIEWS_KEY)): [];
const setReviews = (reviews) => localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));

export const reviewHandlers = [
  http.post(`/books/:id/reviews`, async ({ request }) => {
    const { review, id } = await request.json();
    
    review.id_review = window.crypto.randomUUID().toString();
    review.id_autor = request.headers.get("x-user-id");
    review.id_libro = id;
    
    reviews.push(review);
    setReviews(reviews);
    
    return HttpResponse.json(review, { status: 201 });
  }),
  http.get(`/books/:id/reviews`, async ({ params, request }) => {
    const { id } = params;
    const userId = request.headers.get("x-user-id");
    const review = reviews.filter((rev) => rev.id_libro === id && rev.id_autor === userId );
    return HttpResponse.json(review, { status: 200 });
  })
];