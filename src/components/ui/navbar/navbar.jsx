import { Link } from "react-router";
import "./navbar.css";

function Navbar() {
  return (
    <nav className="Navbar">
      <div id="logo">
        {/* <img src="#" alt="Alexandria logo" /> */}
        <h3 style={{color: "white"}}>ALEXANDRIA</h3>
      </div>
      <ul>
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