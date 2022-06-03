import { motionValue, MotionValue } from "framer-motion";
import { createContext } from "react";

type AppScrollContextType = {
  scrollY: MotionValue<number>;
  scrollHeight: number;
  lockScroll: VoidFunction;
  unlockScroll: VoidFunction;
  isScrollLocked: boolean;
};

const AppScrollContext = createContext<AppScrollContextType>({
  scrollY: motionValue(0),
  scrollHeight: 0,
  lockScroll: () => {},
  unlockScroll: () => {},
  isScrollLocked: false,
});

export default AppScrollContext;
