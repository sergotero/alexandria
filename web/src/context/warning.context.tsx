import type { ServerMessage } from "@shared/types";
import { createContext, useState, type ReactNode } from "react";

// Context definition
type WarningContextType = {
  warning: ServerMessage | null,
  setWarning: React.Dispatch<React.SetStateAction<ServerMessage | null>>,
  update: boolean,
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>
};
// Context creation
export const WarningContext = createContext<WarningContextType | null>(null);

//Context.Provider props' definition
type WarningContextProps = {
  children: ReactNode
}

//Context.Provider definition
function WarningContextProvider({ children }: WarningContextProps) {
  const [ warning, setWarning ] = useState<ServerMessage | null>(null);
  const [ update, setUpdate ] = useState<boolean>(false);
  return (
    <WarningContext.Provider value={{warning, setWarning, update, setUpdate}}>
      {children}
    </WarningContext.Provider>
  );
}

export default WarningContextProvider;