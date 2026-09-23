import type { ServerMessage } from "@shared/types";
import { type ReactNode } from "react";

type PopUpModalProp = {
  id: string,
  text: string,
  icon?: ReactNode,
  warning?: ServerMessage | null,
  children: ReactNode
};

function PopUpModal({ id, text, icon, warning, children }: PopUpModalProp){
  console.log("Aviso: ", warning);
  
  return(
    <>
      <button 
        popoverTarget={`${id}`}
        type="button" 
        className="bg-emerald-600 hover:bg-emerald-500 hover:cursor-pointer text-white rounded-md disabled:bg-zinc-600 disabled:cursor-default m-1 ps-1 pe-2">
          {icon && icon}{text}
      </button>
      <dialog id={`${id}`} popover="auto">
        {warning && warning.success &&
          <div className="success">{warning.data.message}</div>}
        {warning && warning.success === false &&
          <div className="error">{warning.data.message}</div>}
        {children}
      </dialog>
    </>
  );
}

export default PopUpModal;