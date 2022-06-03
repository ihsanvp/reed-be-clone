import { useEffect, useState } from "react";

interface Size {
  width: number;
  height: number;
}

export default function useViewport() {
  const [size, setSize] = useState<Size>({
    width: 0,
    height: 0,
  });

  function updateSize() {
    setSize({ width: window.innerWidth, height: window.innerHeight });
  }

  useEffect(() => {
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
}
