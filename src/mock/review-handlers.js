import { http, HttpResponse } from "msw";

const REVIEWS_KEY = "db-reviews";

const baseAPI = "https://apibooks.com";

const reviews = (localStorage.getItem(REVIEWS_KEY)) ? JSON.parse(localStorage.getItem(REVIEWS_KEY)): [];
const setReviews = (reviews) => localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));

export const reviewHandlers = [
  http.post(`${baseAPI}/reviews`, async ({ request }) => {
    const { review, user } = await request.json();
    
    review.id = window.crypto.randomUUID().toString();
    review.id_autor = user.id;
    
    reviews.push(review);
    setReviews(reviews);
    
    return HttpResponse(review, { status: 201 });
  })
];