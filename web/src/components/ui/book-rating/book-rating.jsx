import styles from "./book-rating.module.css";

function BookRating({ children }){
  
  let threesRule = (5 * +children) / 10;
  let num = Math.round(threesRule);
  let stars;
  switch (num) {
    case 0:
      stars = "☆☆☆☆☆";
      break;
    case 1:
      stars = "★☆☆☆☆";
      break;
    case 2:
      stars = "★★☆☆☆";
      break;
    case 3:
      stars = "★★★☆☆";
      break;
    case 4:
      stars = "★★★★☆";
      break;
    case 5:
      stars = "★★★★★";
      break;
  }

  return(
    <div className={styles.rating}>{stars}</div>
  );
}

export default BookRating;