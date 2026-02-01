import styles from "./book-list.module.css";
import { useAuth } from "../../context";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Bookmark } from "../index";
import * as BookServices from "../../../services/books-services";

function BookList({ isShort = false, hasButtons = false, search}) {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleBooks = async () => {
      console.log(search);
      
      const dataBooks = await BookServices.getBooks(search, page);
      if (isShort) {
        const top10 = dataBooks.slice(0,10);
        setBooks(top10);
      } else {
        setBooks(dataBooks);
      }
    }
    handleBooks();
  }, [page, search]);
  
  useEffect(() => {
    const handleFavorites = async () => {
      const storedFavorites = await BookServices.getFavorites();
      setFavorites([...storedFavorites]);
    }
    handleFavorites();
  }, [])
  
  useEffect(() => {
    BookServices.setFavorites(favorites);
  }, [favorites]);

  const handleAddFavorites = (book) => {
    const newFavorites = [...favorites, book];
    console.log("New favorites", newFavorites);
    setFavorites(newFavorites);
  };

  const handleOnClick = (book) => {
    if(!favorites.some((f) => f.id_libro === book.id_libro)) {
      handleAddFavorites(book);
    }
  }

  return (
    <>
    <div className={`${styles.covers}`}>
      {books.map((book, index) => (
        <div key={index} className={styles.list}>
          <div className={`${styles["image-wrapper"]}`}>
            <img src={book.portada_url} alt={book.titulo} title={book.titulo}/>
          </div>
          <div className={styles.empty} title={book.titulo} onClick={() => navigate(`/books/${book.id_libro}`)}>
            {/* Este div es para crear una capa de traslúcida sobre cada imagen */}
          </div>
          {user && (
            <Bookmark isMarked={book.favorite} book={book} handleOnClick={handleOnClick}/>
          )}
        </div>
      ))}
    </div>
    {hasButtons && (
      <div className={styles.buttons}>
        <button type="button" onClick={() => setPage((prev)=> prev - 1)} disabled={page === 0}><i className="fa-solid fa-arrow-left"></i> Anterior</button>
        <button type="button" onClick={() => setPage((prev)=> prev + 1)}>Siguiente <i className="fa-solid fa-arrow-right"></i></button>
      </div>
    )}
    </>
  );
}

export default BookList;