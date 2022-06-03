import useResizeObserver from "@react-hook/resize-observer";
import { useSpring, useTransform, useViewportScroll } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import useViewport from "./useViewport";

interface Options {
  viscosity: number;
  mass: number;
  damping: number;
  stiffness: number;
}

export default function useSmoothScroll<T extends HTMLElement>(
  options: Options
) {
  const ref = useRef<T>(null);
  const viewport = useViewport();
  const [pageHeight, setPageHeight] = useState(0);

  const scrollHeight = useMemo(
    () =>
      pageHeight * options.viscosity -
      viewport.height * (options.viscosity - 1),
    [pageHeight, viewport.height, options.viscosity]
  );
  const maxScrollY = useMemo(
    () => pageHeight * options.viscosity,
    [pageHeight, options.viscosity]
  );

  const { scrollY } = useViewportScroll();
  const transform = useTransform(scrollY, [0, maxScrollY], [0, -pageHeight]);
  const pageY = useSpring(transform, {
    mass: options.mass,
    damping: options.damping,
    stiffness: options.stiffness,
  });

  useResizeObserver(ref, (entry) => setPageHeight(entry.contentRect.height));

  return {
    ref,
    pageY,
    pageHeight,
    scrollHeight,
  };
}
