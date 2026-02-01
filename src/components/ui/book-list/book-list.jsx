import styles from "./book-list.module.css";
import { useAuth } from "../../context";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Bookmark } from "../index";
import * as BookServices from "../../../services/books-services";

function BookList({ isShort = false, hasButtons = false, favList = false, search, currentFilter = "all" }) {
  const { user } = useAuth();
  const [ books, setBooks ] = useState([]);
  const [ favorites, setFavorites ] = useState([]);
  const [ page, setPage ] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleBooks = async () => {
      const dataBooks = await BookServices.getBooks(search, currentFilter, page);
      if (isShort) {
        const top10 = dataBooks.slice(0,10);
        setBooks(top10);
      } else {
        setBooks(dataBooks);
      }
    }
    handleBooks();
  }, [page, search, currentFilter]);
  
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
    setFavorites(newFavorites);
  };

  const handleOnClick = (book) => {
    if(!favorites.some((f) => f.id_libro === book.id_libro)) {
      handleAddFavorites(book);
    }
  }

  if(favList) {
    return (
      <>
      <div className={`${styles.covers}`}>
        {favorites.map((fav, index) => (
          <div key={index} className={styles.list}>
            <div className={`${styles["image-wrapper"]}`}>
              <img src={fav.portada_url} alt={fav.titulo} title={fav.titulo}/>
            </div>
            <div className={styles.empty} title={fav.titulo} onClick={() => navigate(`/books/${fav.id_libro}`)}>
              {/* Este div es para crear una capa de traslúcida sobre cada imagen */}
            </div>
            {user && !isShort && (
              <Bookmark isMarked={favorites.filter((fav) => fav.id_libro === fav.id_libro && fav.favorite).length < 1 ? false : true} book={fav} handleOnClick={handleOnClick}/>
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
  } else {
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
            {user && !isShort && (
              <Bookmark isMarked={favorites.filter((fav) => fav.id_libro === book.id_libro && fav.favorite).length < 1 ? false : true} book={book} handleOnClick={handleOnClick}/>
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
}

export default BookList;