import "./catalogue-page.css";
import { MainLayout } from "../../components/layouts";
import { BooksList, Search } from "../../components/ui";
import { useState, useEffect } from "react";
import * as BookServices from "../../services/books-services";

function CataloguePage() {
  const [catalogue, setCatalogue] = useState([]);
  const [search, setSearch] = useState("");
  
  //Loads the full catalogue
  useEffect(() => {
    const handleCatalogue = async () => {
      const books = await BookServices.getBooks();
      setCatalogue(books);
    }
    handleCatalogue();
  }, []);

  //Loads the search
  useEffect(() =>{
    if(search != ""){
      const handleSearch = async () => {
        const books = await BookServices.getSearch(encodeURIComponent("titulo="+search));
        setCatalogue(books);
      }
      handleSearch();
    }
  },[search]);

  const handleOnChange = (event) => {
    setSearch(event.target.value);
  }
  
  return (
    <MainLayout>
      <section className="CataloguePage">
        <Search value={search} handleOnChange={handleOnChange}/>
        <BooksList books={catalogue} />
      </section>
    </MainLayout>
  );
}

export default CataloguePage;