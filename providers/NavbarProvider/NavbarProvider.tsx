import { ReactNode, useState } from "react";
import { NavbarContext, NavbarContextType, NavbarState } from "./NavbarContext";

interface Props {
  children?: ReactNode;
}

export default function NavbarProvider(props: Props) {
  const [state, setState] = useState<NavbarState>("normal");

  function setNavbarState(state: NavbarState) {
    setState(state);
  }

  return (
    <NavbarContext.Provider
      value={{
        state,
        setNavbarState,
      }}
    >
      {props.children}
    </NavbarContext.Provider>
  );
}
