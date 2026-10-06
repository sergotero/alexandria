import { useContext } from "react";
import { WarningContext } from "../../context/warning.context";

function useWarningContext(){
  const context = useContext(WarningContext);
  if (context === null) {
    throw new Error("useWarningContext debe utilizarse dentro de WarningContextProvider");
  }
  return context;
}

export default useWarningContext;