import styles from "./book-score.module.css";

function BookScore({ children }) {
  return (
    <div className={styles.score}>
      <span>{children}/5</span>
    </div>
  );
}

export default BookScore;