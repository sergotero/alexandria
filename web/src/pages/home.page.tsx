import { useEffect, useState } from "react";
import * as FullBookService from "./../services/fullbook.services.tsx";
import { type FullBook } from "../types/api-types.tsx";
import type { ServerError } from "../types/error-types.tsx";

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
    <main>
      <div>
        {serverError && (<p>{serverError.message}</p>)}
      </div>
      <h1>Catálogo</h1>
      <p>¡Encuentra el libro que buscas!</p>
      <div>
        {list.map((book, index) => {
          return <pre key={index}>{JSON.stringify(book, null, 2)}</pre>
        })}
      </div>
    </main>
  );
}

export default HomePage;