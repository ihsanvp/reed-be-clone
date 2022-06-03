import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import NavbarLink from "./NavbarLink";

type Link = { label: string; href: string };

interface Props {
  links: Link[];
}

export default function NavbarLinks(props: Props) {
  const linkClassName = "navbar-link";

  const [active, setActive] = useState(0);
  const router = useRouter();
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let done = false;

    for (let i = 0; i < props.links.length; i++) {
      const link = props.links[i];

      if (link.href == router.route) {
        setActive(i);
        done = true;
        break;
      }
    }

    if (!done) {
      setActive(-1);
    }
  }, [router]);

  useEffect(() => {
    const links = document.querySelectorAll(`.${linkClassName}`);

    if (active >= 0 && ref.current) {
      const link = links[active];

      if (link) {
        const rect = link.getBoundingClientRect();
        const containerRect = ref.current.getBoundingClientRect();

        controls.start({
          opacity: 1,
          width: rect.width,
          x: rect.x - containerRect.x,
        });
      }
    } else {
      controls.start({
        opacity: 0,
      });
    }
  }, [active]);

  return (
    <div ref={ref} className="flex gap-10 pr-10 relative">
      <motion.span
        initial={{ opacity: 0 }}
        animate={controls}
        transition={{ type: "spring", damping: 20, mass: 2, stiffness: 60 }}
        className="absolute left-0 bottom-[-1px] h-[2px] bg-[#5a005a]"
      ></motion.span>
      {props.links.length
        ? props.links.map((link, index) => (
            <NavbarLink
              key={link.href}
              label={link.label}
              href={link.href}
              className={linkClassName}
            />
          ))
        : null}
    </div>
  );
}
