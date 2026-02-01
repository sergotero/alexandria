import styles from "./bookmark.module.css";
import { useState } from "react";

function Bookmark({ isMarked = false, book, handleOnClick }){
  const [ content, setContent ] = useState(book);
  const [ mark, setMark ] = useState(isMarked);

  const handleOnMarked = () => {
    content.favorite = !content.favorite;
    handleOnClick(content);
    setMark(!mark);
  }

  if (mark) {
    return (
      <span className={styles.bookmark}>
        <i className={`fa-solid fa-bookmark ${styles.marked}`} onClick={handleOnMarked}/>
      </span>
    );
  } else{
    return (
      <span className={styles.bookmark}>
        <i className={`fa-solid fa-bookmark`} onClick={handleOnMarked}/>
      </span>
    );
  }
}

export default Bookmark;