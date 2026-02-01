import styles from "./filter.module.css";

function Filter({ handleFilter, children }) {
  return (
    <span className={styles.filter} onClick={() => handleFilter(children)}>{ children }</span>
  );
}

export default Filter;