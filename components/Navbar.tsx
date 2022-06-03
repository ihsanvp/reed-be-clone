import { motion, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import useOnScroll from "hooks/useOnScroll";
import classNames from "classnames";
import { useLottie } from "lottie-react";
import logo from "assets/lotties/logo.json";
import NavbarLinks from "./NavbarLinks";

interface Props {
  zIndex: number;
  offset: number;
  elevation: number;
}

export default function Navbar(props: Props) {
  const [active, setActive] = useState(false);

  function onScroll(y: number) {
    if (y > props.offset + 10) {
      setActive(true);
    } else {
      setActive(false);
    }
  }

  const lottie = useLottie({
    animationData: logo,
    initialSegment: [45, 50],
    autoplay: false,
  });

  useOnScroll(onScroll, { delay: 100 });

  useEffect(() => {
    if (active) {
      lottie.playSegments([50, 90]);
    } else {
      lottie.playSegments([90, 50]);
    }
  }, [active]);

  return (
    <motion.nav
      className={classNames(
        "fixed top-0 left-0 right-0 transition-all duration-700 border-b",
        active
          ? "backdrop-blur-md bg-[rgba(255,255,255,0.6)] md:bg-[rgba(255,255,255,0.8)] border-zinc-200 shadow-sm"
          : "bg-transparent backdrop-blur-0 border-transparent shadow-none"
      )}
      style={{
        paddingTop: active ? 0 : props.elevation,
        paddingBottom: active ? 0 : props.elevation,
        zIndex: props.zIndex,
      }}
    >
      <div className={classNames("w-full h-[4rem] md:h-[4.5rem]")}>
        <div className="pl-[1.7vw] md:px-12 mx-auto h-full flex items-center justify-between">
          <div className="h-auto w-20 md:w-32 overflow-hidden">
            {lottie.View}
          </div>
          <div className="hidden  md:flex items-center">
            <NavbarLinks
              links={[
                {
                  label: "Home",
                  href: "/",
                },
                {
                  label: "Services",
                  href: "/services",
                },
                {
                  label: "Work",
                  href: "/work",
                },
                {
                  label: "Vision",
                  href: "/vision",
                },
                {
                  label: "Journal",
                  href: "/journal",
                },
                {
                  label: "Contact",
                  href: "/contact",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
