import { http, HttpResponse } from "msw";
import data from "../../public/alexandria_full.json";

const baseAPI = "https://apibooks.com";

export const handleBooks = [
  http.get(`${baseAPI}/all`, async () => {
    return HttpResponse.json(data, { status: 201 });
  }),
  http.get(`${baseAPI}/details/:id`, async ({ params }) => {
    const { id } = params;
    const book = data.filter((b) => b.id_libro === +id);
    return HttpResponse.json(book, { status: 201 });
  })
];