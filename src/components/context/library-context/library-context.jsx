import { createContext, useState, useContext } from "react";
import data from "../../../data/alexandria_full.json";

const LibraryContext = createContext(null);

function LibraryContextProvider({ children }) {
  const [library, setLibrary] = useState(data);

  return (
    <LibraryContext.Provider value={{ library }}>
      { children }
    </LibraryContext.Provider>
  );
}

export default LibraryContextProvider;
export const useLibrary = () => useContext(LibraryContext);