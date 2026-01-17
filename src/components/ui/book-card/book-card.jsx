import Tag from "../tag/tag";
import "./book-card.css";

function BookCard({ book }){
  const { titulo, autor, descripcion, coleccion, portada_url: url } = book;
  return (
    <div className="BookCard">
      <div className="image-wrapper">
        <img src={url} alt={titulo} />
      </div>
      <div className="book-info">
        <h1>{titulo}</h1>
        <h6>{autor}</h6>
        <p>{descripcion}</p>
        <Tag>{coleccion}</Tag>
      </div>
    </div>
  );
}

export default BookCard;