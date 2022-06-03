import { ScrollContext } from "components/SmoothScroll";
import { useContext } from "react";

export default function useAppScroll() {
  return useContext(ScrollContext);
}
