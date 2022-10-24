import ReactDOM from "react-dom";
import { useEffect, useState } from "react";

// Modal Shell is a component that wraps each modal component & links it to the portal
// open is passed down as a true of false value

type ModalShellProps = {
  children: any;
  open: boolean;
};

const ModalShell = ({ children, open = false }: ModalShellProps) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (isBrowser && open) {
    const container = document.getElementById("modal-root") as Element;
    return ReactDOM.createPortal(children, container);
  } else {
    return null;
  }
};

export default ModalShell;
