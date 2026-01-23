import styles from "./catalogue-page.module.css";
import { MainLayout } from "../../components/layouts";
import { BooksList, Search } from "../../components/ui";
import { useState, useEffect } from "react";
import * as BookServices from "../../services/books-services";

function CataloguePage() {
  const [catalogue, setCatalogue] = useState([]);
  const [search, setSearch] = useState("");
  
  useEffect(() => {
    //Loads the full catalogue
    if(search === "") {
      const handleCatalogue = async () => {
        const books = await BookServices.getBooks();
        setCatalogue(books);
      }
      handleCatalogue();
      //Loads the search
    } else if(search !== ""){
      const handleSearch = async () => {
        const books = await BookServices.getSearch("titulo=" + encodeURIComponent(search));
        setCatalogue(books);
      }
      handleSearch();
    }
  }, [search]);

  const handleOnChange = (event) => {
    setSearch(event.target.value);
  }
  
  return (
    <MainLayout>
      <section className={styles["catalogue-page"]}>
        <Search value={search} handleOnChange={handleOnChange}/>
        <BooksList books={catalogue}/>
      </section>
    </MainLayout>
  );
}

export default CataloguePage;