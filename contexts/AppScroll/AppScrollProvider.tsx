import { motion, useTransform } from "framer-motion";
import useSmoothScroll from "hooks/useSmoothScroll";
import { ReactNode, useEffect, useState } from "react";
import AppScrollContext from "./AppScrollContext";

interface Props {
  children?: ReactNode;
  portal?: ReactNode;
  viscosity: number;
  damping: number;
  stiffness: number;
  mass: number;
}

export default function AppScrollProvider(props: Props) {
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
    <AppScrollContext.Provider
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
    </AppScrollContext.Provider>
  );
}
