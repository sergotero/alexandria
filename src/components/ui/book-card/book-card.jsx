import Tag from "../tag/tag";
import styles from "./book-card.module.css";
import ReviewForm from "../forms/review-form/review-form";
import BookData from "../book-data/book-data";
import BookScore from "../book-score/book-score";

function BookCard({ book }){
  
  const {
    titulo,
    autor,
    descripcion,
    portada_url: url,
    generos_api: tags,
    puntuacion_media: score,
    total_votos: votos
  } = book;

  return (
    <div className={styles["book-card"]}>
      <div className={styles["card-wrapper"]}>
        <div className={styles["image-wrapper"]}>
          <img src={url} alt={titulo} />
        </div>
        <BookData book={book}/>
      </div>
      <div className={styles["card-wrapper"]}>
        <div className={styles["book-info"]}>
          
          {/* Info básica */}
          <div className={styles["score-wrapper"]}>
            <div>
              <h1>{titulo}</h1>
              <h6>{autor}</h6>
            </div>
            <BookScore>
              {score}
            </BookScore>
          </div>
            <p>{descripcion}</p>
          
          {/*TAGS*/}
          <hr /> 
          {tags && tags.map((t) => <Tag>{t}</Tag>)}
          
          {/*FORM*/}
          <hr />
          <ReviewForm />
        </div>
      </div>
    </div>
  );
}

export default BookCard;