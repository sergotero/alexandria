import { useNavigate } from "react-router";
import styles from "./books-list.module.css";

function BooksList({ books }) {
  const navigate = useNavigate();
  
  return (
    <div className={`${styles.covers}`}>
      {books.map((book, index) => (
        <div key={index} className={`${styles["image-wrapper"]}`} onClick={() => navigate(`/books/${book.id_libro}`)}>
          <img src={book.portada_url} alt={book.titulo} title={book.titulo}/>
        </div>
      ))}
    </div>
  );
}

export default BooksList;