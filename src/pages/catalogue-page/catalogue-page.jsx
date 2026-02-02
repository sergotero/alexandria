import styles from "./catalogue-page.module.css";
import { MainLayout } from "../../components/layouts";
import { BookList, Search } from "../../components/ui";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { Filter } from "../../components/ui";
import * as BookServices from "../../services/books-services";

function CataloguePage() {

  const [ search, setSearch ] = useState("");
  const [ filters, setFilters ] = useState([]);
  const [ currentFilter, setCurrentFilter ] = useState("Todos");
  const [ params, setParams ] = useSearchParams("");
  
  useEffect(() => {
    const handleFilters = async () => {
      const categories = await BookServices.getCategories();
      setFilters(categories);
    }
    handleFilters();
  }, []);

  const handleOnChange = (event) => {
    const { value: search } = event.target;
    setSearch(search);
    if (search === ""){
      setParams("");
    } else {
      setParams(`?title=${search}`);
    }
  }

  const handleFilter = (filter) => {
    setCurrentFilter(filter);
  }

  const handleSelection = (filter) => {
    handleFilter(filter);
  }
  
  return (
    <MainLayout>
      <section className={styles["catalogue-page"]}>
        <Search value={search} handleOnChange={handleOnChange}/>
        <div className={styles.filters}>
          {filters.map((fil, index) => <Filter key={index} filter={currentFilter} handleSelection={handleSelection}>{fil}</Filter>)}
        </div>
        <BookList search={search} hasButtons={true} currentFilter={currentFilter}/>
      </section>
    </MainLayout>
  );
}

export default CataloguePage;