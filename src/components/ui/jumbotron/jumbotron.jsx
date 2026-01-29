import styles from "./jumbotron.module.css";
import image from "./../../../assets/images/img1.jpg"

function Jumbotron() {
  return (
    <div className={styles.jumbotron}>
      <img src={image} alt="Door to the imagination" />
    </div>
  );
}

export default Jumbotron;