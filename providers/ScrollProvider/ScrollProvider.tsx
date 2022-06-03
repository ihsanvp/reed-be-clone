import useViewport from "hooks/useViewport";
import { ReactNode } from "react";
import { ScrollContext } from "./ScrollContext";

interface Props {
  children?: ReactNode;
}

export default function ScrollProvider(props: Props) {
  const viewport = useViewport();

  return (
    <ScrollContext.Provider value={{}}>{props.children}</ScrollContext.Provider>
  );
}
