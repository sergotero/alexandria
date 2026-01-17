import { Link } from "react-router";
import "./navbar.css";

function Navbar() {
  return (
    <nav className="Navbar">
      <Link to="/" className="logo-anchor">
        <div id="logo">
          {/* <img src="#" alt="Alexandria logo" /> */}
          <h3 style={{color: "white"}}>ALEXANDRIA</h3>
        </div>
      </Link>
      <ul>
        <li>
          <Link to="/catalogue">Catalogue</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;