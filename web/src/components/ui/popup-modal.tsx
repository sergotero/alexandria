import { type CSSProperties, type ReactNode } from "react";
import useWarningContext from "../hooks/useWarningContext";

type PopUpModalProp = {
  id: string,
  text: string | ReactNode,
  icon?: ReactNode,
  children: ReactNode,
  color?: string,
  backgroundColor?: string,
  title?: string,
  className?: string
};

function PopUpModal({id, text, icon, children, color = "#007a55", backgroundColor = "#007a55", title, className}: PopUpModalProp) {
  
  const themeStyle = {
    "--theme-color": color,
    "--theme-color-hover": `color-mix(in srgb, ${color}, white 18%)`,
    "--shadow-color": backgroundColor ?? "none"
  } as CSSProperties;
  const { warning } = useWarningContext();
  
  return (
    <>
      <button
        popoverTarget={id}
        type="button"
        style={themeStyle}
        className={`bg-[var(--theme-color)] hover:bg-[var(--theme-color-hover)] hover:cursor-pointer text-white rounded-md disabled:bg-zinc-600 disabled:cursor-default transition-colors duration-150 ${className}`}
        title={title}
        aria-label={title}
      >
        {icon && icon}
        {text}
      </button>

      <dialog
        id={id}
        popover="auto"
        style={themeStyle}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] max-w-[1000px] max-h-[90vh] p-[1%] bg-[#09090b] rounded-xl border border-[var(--shadow-color)] shadow-[0_0_200px_10px_var(--shadow-color)] [scrollbar-width:none] backdrop:bg-black/80"
      >
        {warning && warning.success && (
          <div className="success">{warning.data.message}</div>
        )}
        {warning && warning.success === false && (
          <div className="error">{warning.data.message}</div>
        )}
        {children}
      </dialog>
    </>
  );
}

export default PopUpModal;