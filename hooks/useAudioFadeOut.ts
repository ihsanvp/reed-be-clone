import { useRef } from "react";

export default function useAudioFadeOut(duration: number) {
  const interval = useRef<NodeJS.Timer>();

  async function audioFadeIn(el: HTMLMediaElement): Promise<void> {
    return new Promise((resolve) => {
      const step = 0.01;
      const delay = duration * step;

      el.volume = 1;

      interval.current = setInterval(() => {
        if (el.volume == 0) {
          clearInterval(interval.current);
          resolve();
        } else {
          el.volume = Math.max(0, el.volume - step);
        }
      }, delay);
    });
  }

  return audioFadeIn;
}
