import classNames from "classnames";
import { motion, useTransform, Variant } from "framer-motion";
import useAppScroll from "hooks/useAppScroll";
import useIsScrolling from "hooks/useIsScrolling";
import useViewport from "hooks/useViewport";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

interface Props {
  zIndex: number;
  className?: string;
}

type ScrollbarVariantKey = "hidden" | "visible";
type ScrollbarVariants = {
  [key in ScrollbarVariantKey]: Variant;
};

export default function Scrollbar(props: Props) {
  const ref = useRef(null);
  const viewport = useViewport();
  const isScrolling = useIsScrolling({ throttleDelay: 300 });
  const [isDragging, setDragging] = useState(false);
  const [isHovering, setHovering] = useState(false);
  const [height, setHeight] = useState(0);
  const { scrollY, scrollHeight, isScrollLocked } = useAppScroll();
  const y = useTransform(scrollY, [0, scrollHeight], [0, viewport.height]);
  const [animationState, setAnimationState] =
    useState<ScrollbarVariantKey>("visible");

  const variants: ScrollbarVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  useEffect(() => {
    setHeight(
      scrollHeight > window.innerHeight
        ? window.innerHeight * (window.innerHeight / scrollHeight)
        : 0
    );
  }, [scrollHeight]);

  useEffect(() => {
    if (isHovering || isDragging || isScrolling) {
      setAnimationState("visible");
    } else {
      setAnimationState("hidden");
    }
  }, [isScrolling, isHovering, isDragging]);

  function handleMouseMove(e: any) {
    window.scrollTo({
      top: (e.clientY / window.innerHeight) * document.body.scrollHeight,
    });
  }

  function handleMouseUp() {
    setDragging(false);
  }

  useEffect(() => {
    if (isDragging) {
      document.body.style.cursor = "grabbing";
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      document.body.style.cursor = "auto";
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  if (isScrollLocked) {
    return null;
  }

  return (
    <motion.div
      ref={ref}
      className="fixed top-0 right-0 bottom-0 p-[2px]"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      initial="hidden"
      animate={animationState}
      variants={variants}
      transition={{ type: "tween", duration: 0.3 }}
      style={{ zIndex: props.zIndex }}
    >
      <motion.div
        onMouseDown={() => setDragging(true)}
        className={classNames(
          "w-2 select-none",
          isDragging ? "cursor-grabbing" : "cursor-grab",
          props.className
        )}
        style={{ height, y }}
      ></motion.div>
    </motion.div>
  );
}
