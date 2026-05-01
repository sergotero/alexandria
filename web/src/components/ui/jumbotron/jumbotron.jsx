import styles from "./jumbotron.module.css";
import video from "../../../assets/videos/alexandria.mp4";
// import image from "./../../../assets/images/img1.jpg"

function Jumbotron() {
  
  return (
    <div className={styles.jumbotron}>
      {/* <img src={image} alt="Door to the imagination" /> */}
      <video loop={true} preload="true" autoPlay={true} controls >
        <source src={video} type="video/mp4"/>
      </video>
    </div>
  );
}

export default Jumbotron;