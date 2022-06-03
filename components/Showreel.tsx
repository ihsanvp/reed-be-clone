/* eslint-disable react-hooks/exhaustive-deps */
import { AnimatePresence, motion } from "framer-motion";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";
import Portal from "./Portal";

import teaser from "assets/videos/teaser.mp4";
import useAudioFadeIn from "hooks/useAudioFadeIn";
import useAudioFadeOut from "hooks/useAudioFadeOut";
import useAppScroll from "hooks/useAppScroll";

export default function Showreel() {
  const [isOpen, setOpen] = useState(false);

  const player = useRef<HTMLVideoElement>();
  const audioFadeIn = useAudioFadeIn(500);
  const audioFadeOut = useAudioFadeOut(500);
  const { lockScroll, unlockScroll } = useAppScroll();

  async function close() {
    player.current && audioFadeOut(player.current);
    setOpen(false);
  }

  function open() {
    setOpen(true);
  }

  const onVideoMount = useCallback((node: HTMLVideoElement) => {
    if (node) {
      player.current = node;

      setTimeout(() => {
        audioFadeIn(node);
        node.play();
      }, 500);
    }
  }, []);

  function onKeyDown(e: KeyboardEvent) {
    if (e.key == "Escape") {
      close();
    }
  }

  function onMouseDown(e: MouseEvent) {
    if (e.target != player.current) {
      close();
    }
  }

  useEffect(() => {
    if (isOpen) {
      lockScroll();

      window.addEventListener("keydown", onKeyDown);
      window.addEventListener("mousedown", onMouseDown);
    } else {
      unlockScroll();

      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", onMouseDown);
    }

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", onMouseDown);
    };
  }, [isOpen]);

  return (
    <Fragment>
      <AnimatePresence exitBeforeEnter>
        {isOpen ? (
          <Portal>
            <motion.div
              key="teaser-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 bg-white z-[1000] flex items-center justify-center"
            >
              <div className="w-[80vw]">
                <div className="w-full aspect-video flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      type: "spring",
                      delay: 0.5,
                    }}
                    className="overflow-hidden rounded-md"
                  >
                    <video loop ref={onVideoMount} src={teaser}></video>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </Portal>
        ) : null}
      </AnimatePresence>
      <div className="w-full aspect-video flex items-center justify-center overflow-hidden rounded-md relative cursor-pointer">
        <div
          className="hidden md:flex absolute inset-0 backdrop-blur-sm bg-[rgba(255,255,255,0.1)] items-center justify-center z-10 opacity-0 transition-opacity duration-500 hover:opacity-100 cursor-pointer"
          onClick={open}
        >
          <div className="bg-primary text-white p-5 rounded-full flex items-center justify-center">
            <FaPlay size={20} />
          </div>
        </div>
        <div
          className="absolute md:hidden inset-0 flex items-center justify-center z-10"
          onClick={open}
        >
          <div className="bg-pink-600 text-white p-8 rounded-full flex items-center justify-center">
            <FaPlay size={20} />
          </div>
        </div>
        <video className="w-full" autoPlay loop muted src={teaser}></video>
      </div>
    </Fragment>
  );
}
