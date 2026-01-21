import Tag from "../tag/tag";
import styles from "./book-card.module.css";
import ReviewForm from "../forms/review-form/review-form";

function BookCard({ book }){
  const { titulo, autor, descripcion, coleccion, portada_url: url, generos_api: tags } = book;
  return (
    <div className={styles["book-card"]}>
      <div className={styles["image-wrapper"]}>
        <img src={url} alt={titulo} />
      </div>
      <div className={styles["book-info"]}>
        <h1>{titulo}</h1>
        <h6>{autor}</h6>
        <p>{descripcion}</p>
        {tags && tags.map((t) => <Tag>{t}</Tag>)}
        <Tag>{coleccion}</Tag>
        <ReviewForm />
      </div>
    </div>
  );
}

export default BookCard;