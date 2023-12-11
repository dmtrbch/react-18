import { useEffect, useRef, MutableRefObject, ReactElement } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }: { children: ReactElement }) => {
  // i have this piece of something and I need that same thing every single time
  // container to give back the same thing every single time
  const elRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    if(!modalRoot || !elRef.current) {
      return;
    }
    modalRoot.appendChild(elRef.current);

    // mimmicing componentWillUnmount
    // this will run when Modal component unmounts
    return () => {
      if (elRef.current) 
        modalRoot.removeChild(elRef.current)
    };
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
