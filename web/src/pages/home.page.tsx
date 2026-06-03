import { useEffect, useState } from "react";
import * as FullBookService from "./../services/fullbook.services.tsx";
import { type FullBook } from "../../../shared/types/api-types.tsx";
import type { ServerError } from "../../../shared/types/error-types.tsx";
import BookCardsGenerator from "../components/ui/book-cards-generator.tsx";
import BookDetails from "../components/ui/book-details.tsx";

function HomePage() {
  const [ serverError, setServerError ] = useState<ServerError>({});
  const [ list, setList ] = useState<FullBook[]>([]);
  const [ details, setDetails ] = useState<FullBook | null>(null)

  const handleDetails = (fullBook: FullBook) => {
    setDetails(fullBook);
  }

  const fetchFullBooks = async (): Promise<void> => {
    const response = await FullBookService.list();
    if (response.success) {
      setList(response.data);
    } else {
      setServerError(response.error);
    }
  };

  useEffect(() => {
    try {
      fetchFullBooks();
    } catch (error) {
      console.error("Se ha producido un error.", typeof error, error);
    }
  }, []);
  
  return (
    <main className="flex align-top justify-center gap-5 p-5 box-border h-dvh bg-zinc-950">
      <section className="w-1/2 overflow-y-scroll scrollbar-none bg-zinc-800 rounded-xl">
        <div className="grid grid-cols-3 gap-3 p-3">
          <BookCardsGenerator fullBooks={list} handleDetails={handleDetails} />
        </div>
      </section>
      <section className="w-1/3 bg-zinc-700 text-white p-3 rounded-xl">
        <BookDetails book={details} />
      </section>
    </main>
  );
}

export default HomePage;