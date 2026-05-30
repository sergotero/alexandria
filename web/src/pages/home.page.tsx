import { useEffect, useState } from "react";
import * as FullBookService from "./../services/fullbook.services.tsx";
import { type FullBook } from "../types/api-types.tsx";
import type { ServerError } from "../types/error-types.tsx";
import BookCardsGenerator from "../components/ui/book-cards-generator.tsx";

function HomePage() {
  const [ serverError, setServerError ] = useState<ServerError>({});
  const [ list, setList ] = useState<FullBook[]>([]);

  useEffect(() => {
    const fetchFullBooks = async () => {
      const response = await FullBookService.list();
      if (response.success) {
        setList(response.data);
      } else {
        setServerError(response.error);
      }
    };
    fetchFullBooks();
  }, []);
  
  return (
    <main className="flex align-top justify-center gap-5 p-5">
      <section className="min-w-2xl">
        <div className="grid grid-cols-3 gap-3">
          <BookCardsGenerator fullBooks={list} />
        </div>
      </section>
      <section className="bg-red-300 min-w-2xl p-3 rounded-xl">
        Details
      </section>
    </main>
  );
}

export default HomePage;