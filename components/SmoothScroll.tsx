import useSmoothScroll from "hooks/useSmoothScroll";
import { motion, MotionValue, motionValue, useTransform } from "framer-motion";
import { createContext, ReactNode, useEffect, useState } from "react";

interface Props {
  children?: ReactNode;
  portal?: ReactNode;
  viscosity: number;
  damping: number;
  stiffness: number;
  mass: number;
}

type ScrollContextType = {
  scrollY: MotionValue<number>;
  scrollHeight: number;
  lockScroll: VoidFunction;
  unlockScroll: VoidFunction;
  isScrollLocked: boolean;
};

export const ScrollContext = createContext<ScrollContextType>({
  scrollY: motionValue(0),
  scrollHeight: 0,
  lockScroll: () => {},
  unlockScroll: () => {},
  isScrollLocked: false,
});

export default function SmoothScroll(props: Props) {
  const [isScrollLocked, setScrollLocked] = useState(false);

  const scroll = useSmoothScroll<HTMLDivElement>({
    viscosity: props.viscosity,
    damping: props.damping,
    mass: props.mass,
    stiffness: props.stiffness,
  });
  const scrollY = useTransform(scroll.pageY, (v) => v * -1);

  function lockScroll() {
    setScrollLocked(true);
  }

  function unlockScroll() {
    setScrollLocked(false);
  }

  useEffect(() => {
    if (isScrollLocked) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "scroll";
    }
  }, [isScrollLocked]);

  return (
    <ScrollContext.Provider
      value={{
        scrollY,
        scrollHeight: scroll.pageHeight,
        lockScroll,
        unlockScroll,
        isScrollLocked,
      }}
    >
      {props.portal}
      <motion.div
        ref={scroll.ref}
        className="fixed inset-0 bottom-auto will-change-transform overflow-hidden"
        style={{ y: scroll.pageY }}
      >
        {props.children}
      </motion.div>
      <div
        style={{
          height: scroll.scrollHeight,
        }}
      ></div>
    </ScrollContext.Provider>
  );
}
