import { createContext, useState, useContext } from "react";

const AuthContext = createContext(null);
const CURRENT_KEY = "current_user";

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(localStorage.getItem(CURRENT_KEY) ? localStorage.getItem(CURRENT_KEY): undefined);

  const login = () => {
    const user = localStorage.getItem(CURRENT_KEY);
    setUser(user);
  }
  
  const logout = () => {
    localStorage.removeItem(CURRENT_KEY);
    setUser(undefined);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      { children }
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
export const useAuth = () => useContext(AuthContext);