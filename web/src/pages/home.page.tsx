import { useEffect, useState } from "react";
import type { Author, Collection, FullBook, SeriesList, ServerMessage, SimpleReview } from "@shared/types";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CreateSeriesForm from "../components/forms/create-forms/create-series-form.tsx";
import PopUpModal from "../components/ui/popup-modal.tsx";
import { isApiError, dateFormatter } from "../services/utils.services.tsx";
import CreateCollectionForm from "../components/forms/create-forms/create-collection-form.tsx";
import CreateFullbookForm from "../components/forms/create-forms/create-fullbook-form.tsx";
import CreateAuthorForm from "../components/forms/create-forms/create-author-form.tsx";
import EditAllCollectionsForm from "../components/forms/edit-forms/edit-all-collections-form.tsx";
import EditAllSeriesForm from "../components/forms/edit-forms/edit-all-series-form.tsx";
import EditAllAuthorsForm from "../components/forms/edit-forms/edit-all-authors-form.tsx";

function HomePage() {
  const [ queryParams, setQueryParams ] = useSearchParams();
  
  const type = queryParams.get("type") || "title";
  const page = Number(queryParams.get("page")) || 0;
  const searchTerm = queryParams.get("search") || "";

  const [ searchValue, setSearchValue ] = useState<string>("");
  const [ warning, setWarning ] = useState<ServerMessage | null>(null);
  const [ list, setList ] = useState<FullBook[]>([]);
  const [ details, setDetails ] = useState<FullBook | null>(null);
  // const [ review, setReview ] = useState<SimpleReview | null>(null);
  const [ collectionList, setCollectionList ] = useState<Collection[]>([]);
  const [ authorList, setAuthorList ] = useState<Author[]>([]);
  const [ seriesList, setSeriesList ] = useState<SeriesList[]>([]);
  const [ activeTab, setActiveTab ] = useState<"details" | "edition" | "review">("details");

  const handleDetails = (fullBook: FullBook) => {
    setDetails(fullBook);
  }

  const updateDetails = async (bookId: number) => {
    try {
      const response = await FullBookService.detail(bookId);
      if (response.success) {
        const updatedBook = response.data;
        setDetails(updatedBook);
        setList(prevList =>
          prevList.map(fullBook =>
            fullBook.bookBase.id === updatedBook.bookBase.id
              ? updatedBook
              : fullBook
          )
        );
        setWarning({
          success: true,
          data: {
            message: "Se han actualizado los datos",
            statusCode: 200
          }
        });
      }
    } catch (error: unknown) {
      if(isApiError(error)){
        setWarning({
          success: error.success,
          data: {
            message: error.error.message,
            statusCode: error.error.statusCode
          }
        });
      }
    }
  }

  const fetchFullBooks = async (): Promise<void> => {
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
    }
  };

  const fetchCollections = async (): Promise<void> => {
    const response = await CollectionServices.list();
    if (response.success) {
      response.data.unshift({ id: 0, name: "- - -", colorCode: "#000000" });
      setCollectionList(response.data);
    } 
  };

  const fetchSeries = async (): Promise<void> => {
    const response = await SeriesServices.list();
    if (response.success) {
      response.data.unshift({ id: 0, name: "- - -", volumes: 0, status: "Desconocido" });
      setSeriesList(response.data);
    }
  };

  const fetchAuthors = async (): Promise<void> => {
    const response = await AuthorServices.list();
    if (response.success) {
      response.data.unshift({ id: 0, name: "", lastname1: "", lastname2: "", lastname3: "", alias: "- - -" });
      setAuthorList(response.data);
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
      setWarning({
        success: true,
        data: {
          message: "Los listados se han cargado de manera exitosa",
          statusCode: 200
        }
        });
    } catch (error: unknown) {
      if(isApiError(error)){
        setWarning({
          success: error.success,
          data: {
            message: error.error.message,
            statusCode: error.error.statusCode
          }
        });
      }
    }
  }, []);

  useEffect(() => {
    try {
      fetchFullBooks();
    } catch (error: unknown) {
      if(isApiError(error)){
        setWarning({
          success: error.success,
          data: {
            message: error.error.message,
            statusCode: error.error.statusCode
          }
        });
      }
    }
  }, [page, searchTerm]);

  useEffect(() => {
    let warningTimeout: number;
    if (warning) {
      warningTimeout = setTimeout(() => {
        setWarning(null);
      }, 5000);
    }
    return () => {
      clearTimeout(warningTimeout);
    }
  }, [warning]);


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
          <div className="grid grid-flow-row grid-cols-6 gap-3 w-[70%] bg-zinc-800 p-2 rounded-xl">
            <button
              className="bg-yellow-600 hover:bg-yellow-500 hover:cursor-pointer text-white min-w-24 rounded-md pe-2 disabled:bg-zinc-600 disabled:cursor-default"
              type="button"
              onClick={() => setQueryParams({ type, search: searchTerm, page: (page - 1).toString() })}
              disabled={+page <= 0}>
                <FontAwesomeIcon icon="angle-left"/>Anterior
            </button>
            <button
              className="bg-yellow-600 hover:bg-yellow-500 hover:cursor-pointer text-white min-w-24 rounded-md disabled:bg-zinc-600 disabled:cursor-default ps-2"
              type="button"
              onClick={() => setQueryParams({ type, search: searchTerm, page: (page + 1).toString() })}
              disabled={list.length < 18}>
                Siguiente<FontAwesomeIcon icon="angle-right"/>
            </button>
            <PopUpModal
              id={"add-author"}
              text={" Autor"}
              icon={<FontAwesomeIcon fontSize={14} icon="user-plus"/>}
              warning={warning}
              title={"Añadir nuevo usuario"}>
                <CreateAuthorForm 
                  warning={warning} 
                  setWarning={setWarning}
                />
            </PopUpModal>
            <PopUpModal
              id={"add-series"}
              text={" Serie"}
              icon={<FontAwesomeIcon fontSize={14} icon="layer-group"/>}
              warning={warning}
              title={"Añadir nueva serie"}>
                <CreateSeriesForm 
                  warning={warning} 
                  setWarning={setWarning}
                />
            </PopUpModal>
            <PopUpModal
              id={"add-collection"}
              text={" Colección"}
              icon={<FontAwesomeIcon fontSize={14} icon="folder-plus"/>}
              warning={warning}
              title={"Añadir nueva colección"}>
                <CreateCollectionForm 
                  warning={warning}
                  setWarning={setWarning}
                />
            </PopUpModal>
            <PopUpModal
              id={"add-fullbook"}
              text={" Libro"}
              icon={<FontAwesomeIcon fontSize={14} icon="book-medical"/>}
              warning={warning}
              title={"Añadir nuevo libro"}>
                <CreateFullbookForm
                  warning={warning}
                  setWarning={setWarning}
                  authorList={authorList}
                  collectionList={collectionList} 
                  seriesList={seriesList}
                />
            </PopUpModal>
          </div>
          <div className="grid grid-flow-row grid-cols-3 gap-3 w-[30%] bg-zinc-800 p-2 rounded-xl">
            <PopUpModal
              id={"mod-authors"}
              text={" Autores"}
              icon={<FontAwesomeIcon fontSize={14} icon="user-pen"/>}
              warning={warning}
              color={"#432dd7"}
              title={"Modificar autores"}>
                <EditAllAuthorsForm
                  authorList={authorList}
                  setAuthorList={setAuthorList}
                  warning={warning}
                  setWarning={setWarning}
                />
            </PopUpModal>
            <PopUpModal
              id={"mod-series"}
              text={" Series"}
              icon={<FontAwesomeIcon fontSize={14} icon="pen-to-square"/>}
              warning={warning}
              color={"#432dd7"}
              title={"Modificar series"}>
                <EditAllSeriesForm
                  seriesList={seriesList}
                  setSeriesList={setSeriesList}
                  warning={warning}
                  setWarning={setWarning}
                />
            </PopUpModal>
            <PopUpModal
              id={"mod-collections"}
              text={" Colecciones"}
              icon={<FontAwesomeIcon fontSize={14} icon="folder-open"/>}
              warning={warning}
              color={"#432dd7"}
              title={"Modificar colecciones"}>
                <EditAllCollectionsForm
                  collectionList={collectionList}
                  setCollectionList={setCollectionList}
                  warning={warning}
                  setWarning={setWarning}
                />
            </PopUpModal>
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
                  <button
                    className={`${activeTab === "review" ? "bg-zinc-600" : "bg-zinc-800 border-s-1 border-t-1 border-e-1 border-zinc-600"} hover:cursor-pointer text-white min-w-24 disabled:bg-zinc-600 disabled:cursor-default rounded-tr-md rounded-tl-md`}
                    type="button"
                    onClick={() => (setActiveTab("review"))}>
                    Reseña
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
                  {activeTab === "review" && !details?.review?.id && (
                    <div className="flex flex-col gap-5">
                      <h1 className="font-extrabold text-3xl text-center">Este libro todavía no tiene una reseña.</h1>
                      <button
                        className="bg-emerald-600 hover:bg-emerald-500 hover:cursor-pointer text-white min-w-24 rounded-md ps-2 pe-2 disabled:bg-zinc-600 disabled:cursor-default self-center"
                        type="button">
                          Añadir reseña
                      </button>
                    </div>
                  )}
                  {activeTab === "review" && details?.review?.id && (
                    <div>
                      <div className="flex">
                        <div className="w-[70%]">
                          <p>Fecha: {dateFormatter(details.review.readingDate!)}</p>
                          <p>Completado: {details.review.completed ? "Sí" : "No"}</p>
                        </div>
                        <div className="flex flex-col justify-center items-center w-[30%] min-h-[120px] bg-zinc-900 rounded-2xl">
                          <p className="italic text-sm -mt-3">Puntuación</p>
                          <h1 className="text-7xl text-center">{details.review.score}</h1>
                        </div>
                      </div>
                        <div className="p-2">
                          <p className="italic text-justify">{details.review.comments}</p>
                        </div>
                    </div>
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