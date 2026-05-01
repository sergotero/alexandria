import styles from "./tag.module.css";

function Tag({ children }) {
  return (
    <span className={styles.tag}>{ children }</span>
  );
}

export default Tag;