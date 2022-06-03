import { NavbarContext } from "providers/NavbarProvider/NavbarContext";
import { useContext } from "react";

export default function useNavbar() {
  return useContext(NavbarContext);
}
