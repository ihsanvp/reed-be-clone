/* eslint-disable react-hooks/exhaustive-deps */
import { throttle } from "lodash";
import { useEffect } from "react";
import useAppScroll from "./useAppScroll";

interface Options {
  delay?: number;
}

type CallbackType = (y: number) => void;

export default function useOnScroll(
  callback: CallbackType,
  { delay = 0 }: Options = {}
) {
  const { scrollY } = useAppScroll();

  useEffect(
    () => scrollY.onChange(throttle(callback, delay)),
    [callback, delay]
  );
}
