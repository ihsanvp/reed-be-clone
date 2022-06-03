import { createContext } from "react";

export type NavbarState = "normal" | "active" | "hidden";

export interface NavbarContextType {
  state: NavbarState;
  setNavbarState: (state: NavbarState) => void;
}

export const NavbarContext = createContext<NavbarContextType>({
  state: "normal",
  setNavbarState: () => {},
});
