import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface Props {
  children: ReactNode;
}

export default function Portal(props: Props) {
  return createPortal(
    props.children,
    document.querySelector("#portal") as Element
  );
}
