import { Link } from "react-router";
import { useAuth } from "../../context";
import styles from "./sidenav.module.css";

function SideNav({ open, setIsOpen }) {
  const { setUser } = useAuth();
  const logout = () => {
    setUser(null);
    setIsOpen(!open);
  };

  return (
    <div className={`${styles.sidenav} ${open ? styles.open : ""}`}>
      <button className={styles.closebtn} onClick={() => setIsOpen(!open)} id="close" >×</button>
      <Link to="/profile"><i className="fa-solid fa-user"></i> Profile</Link>
      <Link to="/statistics"><i className="fa-solid fa-chart-pie"></i> Statistics</Link>
      <a href="" onClick={logout}><i className="fa-solid fa-arrow-right-from-bracket"></i> Logout</a>
    </div>
  );
}

export default SideNav;