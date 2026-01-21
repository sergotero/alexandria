import { Link } from "react-router";
import styles from "./navbar.module.css";
import { useAuth } from "../../context";

function Navbar() {
  const { user } = useAuth();

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles["logo-anchor"]}>
        <div id="logo">
          {/* <img src="#" alt="Alexandria logo" /> */}
          <h3 style={{color: "white"}}>ALEXANDRIA</h3>
        </div>
      </Link>
      <ul>
        <li>
          <Link to="/catalogue">Catalogue</Link>
        </li>
        {!user ? (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
          ) : (
          <>
            <li>
              <Link to="/favorites"><i className="fa-regular fa-bookmark"></i></Link>
            </li>
            <li>
              <Link to="/profile"><i className="fa-solid fa-user"></i></Link>
            </li>
          </>
          )}
      </ul>
    </nav>
  );
}

export default Navbar;