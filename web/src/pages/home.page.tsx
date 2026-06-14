import { useEffect, useState } from "react";
import * as FullBookService from "./../services/fullbook.services.tsx";
import BookCardsGenerator from "../components/ui/book-cards-generator.tsx";
import BookDetails from "../components/ui/book-details.tsx";
import type { FullBook, ServerErrorDTO } from "@shared/types";
import Header from "../components/ui/header.tsx";
import * as style from "./home.page.module.css";

function HomePage() {
  const [ serverError, setServerError ] = useState<ServerErrorDTO>({});
  const [ list, setList ] = useState<FullBook[]>([]);
  const [ details, setDetails ] = useState<FullBook | null>(null);
  const [ page, setPage ] = useState<number>(0);
  const [ activeTab, setActiveTab ] = useState<"details" | "edition">("details");

  const handleDetails = (fullBook: FullBook) => {
    setDetails(fullBook);
  }

  const fetchFullBooks = async (): Promise<void> => {
    const response = await FullBookService.list(page);
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
      // setServerError(error);
    }
  }, [page]);
  
  return (
    <>
      <Header>
        <div className="flex items-center justify-center h-[10vh] bg-zinc-900">
        {/*Search bar*/}
        <input className="bg-zinc-300 rounded-2xl p-1 ps-2 pe-2" type="text" name="search" id="search" placeholder="Buscar..." />
        </div>
      </Header>
      <main className="flex flex-col justify-top min-h-[90vh] items-center gap-5 p-5 bg-zinc-950">
        <div className="flex gap-5 align-top justify-center w-[80%]">
          {/* BookCards */}
          <section className="grid grid-cols-3 gap-3 p-3 w-[70%] overflow-y-scroll scrollbar-none bg-zinc-800 rounded-xl ">
              <BookCardsGenerator fullBooks={list} handleDetails={handleDetails} />
          </section>
          {/* Details & More */}
          <section className="w-[30%] bg-zinc-700 text-white p-3 rounded-xl">
            <div className={style.tabs}>
              <button
                className={`bg-yellow-600 hover:cursor-pointer text-white min-w-24 rounded-tl-md disabled:bg-zinc-600 disabled:cursor-default rounded-tr-md rounded-tl-md`}
                type="button"
                onClick={() => (setActiveTab("details"))}>
                  Detalles
                </button>
              <button
                className={`bg-red-600 hover:cursor-pointer text-white min-w-24 disabled:bg-zinc-600 disabled:cursor-default rounded-tr-md rounded-tl-md`}
                type="button"
                onClick={() => (setActiveTab("edition"))}>
                  Edición
                </button>
            </div>
            <div className={`tabs-content ${activeTab === "details" ? "bg-yellow-600" : "bg-red-600"} p-5`}>
              {activeTab === "details" && (
                <BookDetails book={details} />
              )}
              {activeTab === "edition" && (
                "Here goes a form"
              )}
            </div>
          </section>
        </div>
        {/* Previous/Next buttons */}
        <div className="flex justify-center gap-5 p-2 bg-zinc-700 w-[81%] rounded-xl mt-auto">
            <button
              className="bg-yellow-600 hover:bg-yellow-500 hover:cursor-pointer text-white min-w-24 rounded-md disabled:bg-zinc-600 disabled:cursor-default" 
              type="button"
              onClick={() => {setPage(page-1)}}
              disabled={page <= 0}>
              Anterior
            </button>
            <button
              className="bg-yellow-600 hover:bg-yellow-500 hover:cursor-pointer text-white min-w-24 rounded-md disabled:bg-zinc-600 disabled:cursor-default" 
              type="button"
              onClick={() => {setPage(page+1)}}
              disabled={list.length < 18}>
              Siguiente
            </button>
          </div>
      </main>
    </>
  );
}

export default HomePage;