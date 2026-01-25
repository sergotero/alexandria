import { Link } from "react-router";
import { useAuth } from "../../context";
import styles from "./sidenav.module.css";

function SideNav({ open, setIsOpen }) {
  const { logout } = useAuth();
  
  const handleLogOut = () => {
    //Logout within the AuthContext
    logout();
  };

  return (
    <div className={`${styles.sidenav} ${open ? styles.open : ""}`}>
      <button className={styles.closebtn} onClick={() => setIsOpen(!open)} id="close" >×</button>
      <Link to="/profile"><i className="fa-solid fa-user"></i> Profile</Link>
      <a href="" onClick={handleLogOut}><i className="fa-solid fa-arrow-right-from-bracket"></i> Logout</a>
    </div>
  );
}

export default SideNav;