import { http, HttpResponse } from "msw";
import data from "../../public/alexandria_full.json";

const baseAPI = "https://apibooks.com";

export const handleBooks = [
  http.get(`${baseAPI}/all`, async () => {
    return HttpResponse.json(data, { status: 201 });
  }),
  http.get(`${baseAPI}/details/:id`, async ({ params }) => {
    const { id } = params;
    return HttpResponse.json(data.filter((b) => b.id === id), { status: 201 });
  })
];