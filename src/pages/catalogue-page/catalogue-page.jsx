import styles from "./catalogue-page.module.css";
import { MainLayout } from "../../components/layouts";
import { BooksList, Search } from "../../components/ui";
import { useState, useEffect } from "react";
import * as BookServices from "../../services/books-services";
import { useSearchParams } from "react-router";

function CataloguePage() {
  const [catalogue, setCatalogue] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [params, setParams] = useSearchParams("");

  
  useEffect(() => {
    const handleCatalogue = async () => {
      const books = await BookServices.getBooks(search, page);
      setCatalogue(books);
    }
    handleCatalogue();
  }, [search, page]);

  const handleOnChange = (event) => {
    const { value: search } = event.target;
    setSearch(search);
    if (search === ""){
      setParams("");
    } else {
      setParams(`?title=${search}`);
    }
  }
  
  return (
    <MainLayout>
      <section className={styles["catalogue-page"]}>
        <Search value={search} handleOnChange={handleOnChange}/>
        <BooksList books={catalogue}/>
        <div className={styles.buttons}>
          <button type="button" onClick={() => setPage((prev)=> prev - 1)} disabled={page === 0}><i className="fa-solid fa-arrow-left"></i> Previous</button>
          <button type="button" onClick={() => setPage((prev)=> prev + 1)}>Next <i className="fa-solid fa-arrow-right"></i></button>
        </div>
      </section>
    </MainLayout>
  );
}

export default CataloguePage;