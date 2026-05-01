import { useAuth } from "../context";
import { Navigate } from "react-router";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  
  if (!user) return (<Navigate to="/login" />)
  else return children;
}

export default PrivateRoute;