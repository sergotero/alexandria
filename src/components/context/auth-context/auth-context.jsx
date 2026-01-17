import { createContext, useState, useContext } from "react";

const AuthContext = createContext(null);

function AuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      { children }
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
export const useAuth = () => useContext(AuthContext);