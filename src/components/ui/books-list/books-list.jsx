import { useNavigate } from "react-router";
import "./books-list.css";

function BooksList({ books }) {
  const navigate = useNavigate();

  return (
    <div className="BookList covers">
      {books.map((book, index)=> (
        <div key={index} className="BookList image-wrapper" onClick={() => navigate(`/details/${book.id_libro}`)}>
          <img src={book.portada_url} alt={book.titulo} title={book.titulo}/>
        </div>
      ))}
    </div>
  );
}

export default BooksList;