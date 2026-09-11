import { useEffect, useState } from "react";
import type { Author, Collection, FullBook, SeriesList, ServerErrorDTO } from "@shared/types";
import { useSearchParams } from "react-router";
import BookCardsGenerator from "../components/ui/book-cards-generator.tsx";
import BookDetails from "../components/ui/book-details.tsx";
import Header from "../components/ui/header.tsx";
import EditAllForm from "../components/forms/edit-all-form.tsx";
import * as FullBookService from "./../services/fullbook.services.tsx";
import * as CollectionServices from "./../services/collection.services.tsx";
import * as SeriesServices from "./../services/series.services.tsx";
import * as AuthorServices from "./../services/author.services.tsx";
import style from "./home.page.module.css";
import SearchBar from "../components/ui/search-bar.tsx";

function HomePage() {
  const [queryParams, setQueryParams] = useSearchParams();
  
  const type = queryParams.get("type") || "title";
  const page = Number(queryParams.get("page")) || 0;
  const searchTerm = queryParams.get("search") || "";

  const [searchValue, setSearchValue] = useState<string>("");
  const [serverError, setServerError] = useState<ServerErrorDTO>({});
  const [list, setList] = useState<FullBook[]>([]);
  const [details, setDetails] = useState<FullBook | null>(null);
  const [collectionList, setCollectionList] = useState<Collection[]>([]);
  const [authorList, setAuthorList] = useState<Author[]>([]);
  const [seriesList, setSeriesList] = useState<SeriesList[]>([]);
  const [activeTab, setActiveTab] = useState<"details" | "edition">("details");

  const handleDetails = (fullBook: FullBook) => {
    setDetails(fullBook);
  }

  const updateDetails = async (bookId: number) => {
    try {
      const response = await FullBookService.detail(bookId);
      if (!response.success) {
        setServerError(response.error);
        return;
      }

      const updatedBook = response.data;
      setDetails(updatedBook);
      setList(prevList =>
        prevList.map(fullBook =>
          fullBook.bookBase.id === updatedBook.bookBase.id
            ? updatedBook
            : fullBook
        )
      );
    } catch (error) {
      console.error("Se ha producido un error.", error);
    }
  }

  const fetchFullBooks = async (): Promise<void> => {
    try {
      let response;

      if (type === "title" && searchTerm !== "") {
        response = await FullBookService.findByTitle(searchTerm, page);
      } else if (type === "author" && searchTerm !== "") {
        response = await FullBookService.findByAuthor(searchTerm, page);
      } else if (type === "collection" && searchTerm !== "") {
        response = await FullBookService.findByCollection(searchTerm, page);
      } else if (type === "series" && searchTerm !== "") {
        response = await FullBookService.findBySeries(searchTerm, page);
      } else {
        response = await FullBookService.list(page);
      }

      if (response.success) {
        setList(response.data);
      } else {
        setServerError(response.error);
      }
    } catch (error) {
      console.error("Error al cargar libros:", error);
    }
  };

  const fetchCollections = async (): Promise<void> => {
    const response = await CollectionServices.list();
    if (response.success) {
      setCollectionList(response.data);
    } else {
      setServerError(response.error);
    }
  };

  const fetchSeries = async (): Promise<void> => {
    const response = await SeriesServices.list();
    if (response.success) {
      response.data.push({ id: 0, name: "", volumes: 0, status: "Desconocido" });
      setSeriesList(response.data);
    } else {
      console.error("Se ha producido un error", response.error);
      setServerError(response.error);
    }
  };

  const fetchAuthors = async (): Promise<void> => {
    const response = await AuthorServices.list();
    if (response.success) {
      setAuthorList(response.data);
    } else {
      console.error("Se ha producido un error", response.error);
      setServerError(response.error);
    }
  }

  const handleSearchType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const type = event.target.value;
    setQueryParams({ type, search: searchValue, page: "0" });
  };
  
  const handleSearchValue = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSearchValue(event.target.value);
  }

  const handleSearchTerm = async (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      setQueryParams({ type, search: searchValue, page: "0" });
    }
  };

  useEffect(() => {
    try {
      fetchCollections();
      fetchSeries();
      fetchAuthors();
    } catch (error) {
      console.error("Se ha producido un error.", error);
      // setServerError(error);
    }
  }, []);

  useEffect(() => {
    try {
      fetchFullBooks();
    } catch (error) {
      console.error("Se ha producido un error.", error);
      // setServerError(error);
    }
  }, [page, searchTerm]);


  return (
    <>
      <Header>
        <search className="flex items-center justify-center h-[10vh] bg-zinc-900">
          {/*Search bar*/}
          <SearchBar
            searchType={type}
            searchValue={searchValue}
            handleSearchType={handleSearchType}
            handleSearchTerm={handleSearchTerm}
            handleSearchValue={handleSearchValue}
          />
        </search>
      </Header>
      <main className="flex flex-col justify-top min-h-[90vh] items-center gap-5 p-5 bg-zinc-950">
        {/* Buttons */}
        <div className="flex gap-5 align-top justify-center w-[80%]">
          <div className="flex items-center justify-center gap-3 w-[70%] bg-zinc-800 p-2 rounded-xl">
            <button
              className="bg-yellow-600 hover:bg-yellow-500 hover:cursor-pointer text-white min-w-24 rounded-md disabled:bg-zinc-600 disabled:cursor-default"
              type="button"
              onClick={() => setQueryParams({ type, search: searchTerm, page: (page - 1).toString() })}
              disabled={+page <= 0}>
              Anterior
            </button>
            <button
              className="bg-yellow-600 hover:bg-yellow-500 hover:cursor-pointer text-white min-w-24 rounded-md disabled:bg-zinc-600 disabled:cursor-default"
              type="button"
              onClick={() => setQueryParams({ type, search: searchTerm, page: (page + 1).toString() })}
              disabled={list.length < 18}>
              Siguiente
            </button>
          </div>
          <div className="w-[30%] bg-zinc-800 p-2 rounded-xl">
            <button type="button" className="bg-green-600 hover:bg-green-500 p-0.5 rounded-md text-white w-17 hover:cursor-pointer">Añadir</button>
          </div>
        </div>
        <div className="flex gap-5 align-top justify-center w-[80%]">
          {/* BookCards */}
          <section className="grid grid-cols-3 grid-rows-6 gap-3 p-3 w-[70%] overflow-y-scroll scrollbar-none bg-zinc-800 rounded-xl ">
            <BookCardsGenerator fullBooks={list} handleDetails={handleDetails} />
          </section>
          {/* Details & More */}
          <section className="w-[30%] bg-zinc-800 text-white p-3 rounded-xl">
            {/* TABS */}
            {details === null ? (
              <div className="flex items-center justify-center h-[100vh] flex-wrap border border-zinc-400 border-dashed rounded">
                <h1 className="font-extrabold text-3xl text-center">No hay ningún libro seleccionado</h1>
              </div>
            ) : (
              <>
                <div className={style.tabs}>
                  <button
                    className={`${activeTab === "details" ? "bg-zinc-600" : "bg-zinc-800 border-s-1 border-t-1 border-e-1 border-zinc-600"} hover:cursor-pointer text-white min-w-24 disabled:bg-zinc-600 disabled:cursor-default rounded-tr-md rounded-tl-md`}
                    type="button"
                    onClick={() => (setActiveTab("details"))}>
                    Detalles
                  </button>
                  <button
                    className={`${activeTab === "edition" ? "bg-zinc-600" : "bg-zinc-800 border-s-1 border-t-1 border-e-1 border-zinc-600"} hover:cursor-pointer text-white min-w-24 disabled:bg-zinc-600 disabled:cursor-default rounded-tr-md rounded-tl-md`}
                    type="button"
                    onClick={() => (setActiveTab("edition"))}>
                    Actualizar
                  </button>
                </div>
                    {/* Content */}
                <div className={`tabs-content bg-zinc-600 p-5 h-[100dvh] rounded-bl-md rounded-br-md rounded-tr-md overflow-y-scroll scrollbar-none`}>
                  {activeTab === "details" && (
                    <BookDetails book={details} />
                  )}
                  {/* Edition Form */}
                  {activeTab === "edition" && details && (
                    <EditAllForm
                      fullbook={details}
                      updateBook={updateDetails}
                      authorList={authorList}
                      collectionList={collectionList}
                      seriesList={seriesList}
                    />
                  )}
                </div>
              </>
            )}
          </section>
        </div>
      </main>
    </>
  );
}

export default HomePage;