import { useNavigate } from "react-router";
import "./books-list.css";

function BooksList({ books }) {
  const navigate = useNavigate();

  return (
    <div className="BookList covers">
      {books.map((book)=> (
        <div key={book.id_libro} className="BookList image-wrapper" onClick={() => navigate(`/details/${book.id_libro}`)}>
          <img src={book.portada_url} alt={book.titulo} />
        </div>
      ))}
    </div>
  );
}

export default BooksList;