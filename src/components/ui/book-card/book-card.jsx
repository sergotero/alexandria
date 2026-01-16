import "./book-card.css";

function BookCard({ book }){
  return (
    <div className="BookCard image-wrapper">
      <img src={book.portada_url} alt={book.titulo} />
    </div>
  );
}

export default BookCard;