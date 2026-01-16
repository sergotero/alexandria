import "./books-list.css";

function BooksList({ books }) {
    
  return (
    <div className="BookList covers">
      {books.map((book)=> (
        <div key={book.id_libro} className="BookCard image-wrapper">
          <img src={book.portada_url} alt={book.titulo} />
        </div>
      ))}
    </div>
  );
}

export default BooksList;