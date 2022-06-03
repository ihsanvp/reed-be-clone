import { throttle } from "lodash";
import { useEffect, useRef, useState } from "react";
import useAppScroll from "./useAppScroll";

interface Options {
  throttleDelay?: number;
}

export default function useIsScrolling({ throttleDelay = 0 }: Options = {}) {
  const [scrolling, setScrolling] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const { scrollY } = useAppScroll();

  useEffect(() =>
    scrollY.onChange(
      throttle(() => {
        setScrolling(true);
        if (timer.current !== null) {
          clearTimeout(timer.current);
        }
        timer.current = setTimeout(
          () => setScrolling(false),
          throttleDelay + 10
        );
      }, throttleDelay)
    )
  );

  return scrolling;
}
