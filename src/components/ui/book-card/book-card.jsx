import Tag from "../tag/tag";
import styles from "./book-card.module.css";
import ReviewForm from "../forms/review-form/review-form";
import BookData from "../book-data/book-data";
import BookScore from "../book-score/book-score";
import * as ReviewServices from "./../../../services/review-services";
import { useAuth } from "../../context";
import { useEffect, useState } from "react";
import BookRating from "../book-rating/book-rating";
import { Link } from "react-router";

function BookCard({ book }) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);

  const {
    titulo,
    autor,
    descripcion,
    portada_url: url,
    generos_api: tags,
    puntuacion_media: score,
    id_libro: id
  } = book;

  useEffect(() => {
    const handleReviews = async () => {
      if (user) {
        try {
          const reviews = await ReviewServices.getReviews(id);
          setReviews(reviews);
        } catch (error) {
          console.error(error);
        }
      }
    }
    handleReviews();
  }, [reviews]);

  return (
    <div className={styles["book-card"]}>
      <div className={styles["card-wrapper"]}>
        <div className={styles["image-wrapper"]}>
          <img src={url} alt={titulo} />
        </div>
        <BookData book={book} />
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
          {/* <hr /> */}
          {tags && tags.map((t, i) => <Tag key={i}>{`#${t}`}</Tag>)}

          {/*FORM*/}
          {/* <hr /> */}
          {user && reviews.length !== 0 && (
            <div className={styles["review-card"]}>
              {reviews.map((review) => {
                return (
                  <>
                    <div className={styles["review-header"]}>
                      <h5>Valoración personal <span>{review.date}</span></h5>
                      <BookRating>{review.rate}</BookRating>
                    </div>
                    <div className={styles["review-body"]}>
                      <p key={review.id_review}>{review.review}</p>
                    </div>
                  </>
                );
              })}
            </div>
          )}
          {!user && (
            <div className={styles["review-card"]}>
              <p>Para dejar tu reseña, debes estar <Link to="/register">registrado</Link> en la página. Si tienes cuenta, <Link to="/login">accede</Link>.</p>
            </div>
          )}
          {user && reviews.length <= 0 && (<ReviewForm />)}

        </div>
      </div>
    </div>
  );
}

export default BookCard;