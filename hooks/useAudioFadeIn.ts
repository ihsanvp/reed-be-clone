import { useRef } from "react";

export default function useAudioFadeIn(duration: number) {
  const interval = useRef<NodeJS.Timer>();

  function audioFadeIn(el: HTMLMediaElement): Promise<void> {
    return new Promise((resolve) => {
      const step = 0.01;
      const delay = duration * step;

      el.volume = 0;

      interval.current = setInterval(() => {
        if (el.volume == 1) {
          clearInterval(interval.current);
          resolve();
        } else {
          el.volume = Math.min(1, el.volume + step);
        }
      }, delay);
    });
  }

  return audioFadeIn;
}
