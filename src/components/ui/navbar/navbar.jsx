import { Link } from "react-router";
import { useAuth } from "../../context";
import { useState } from "react";
import SideNav from "../sidenav/sidenav";
import styles from "./navbar.module.css";

function Navbar() {
  const { user, setUser } = useAuth();
  const [ isOpen, setIsOpen ] = useState(false);

  return (
    <>
      <nav className={styles.navbar}>
        <Link to="/" className={styles["logo-anchor"]}>
          <div id="logo">
            {/* <img src="#" alt="Alexandria logo" /> */}
            <h3 style={{color: "white"}}>ALEXANDRIA</h3>
          </div>
        </Link>
        <ul>
          <li>
            <Link to="/books">Catalogue</Link>
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
              <li className={styles.logout} onClick={() => {setIsOpen(!isOpen)}}>
                <i className="fa-solid fa-user"></i>
              </li>
            </>
            )}
        </ul>
      </nav>
      <SideNav open={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}

export default Navbar;