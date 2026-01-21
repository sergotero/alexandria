import styles from "./tag.module.css";

function Tag({ children }) {
  return (
    <span className={styles.tag} style={{backgroundColor: "#772B8C"}}>{ children }</span>
  );
}

export default Tag;