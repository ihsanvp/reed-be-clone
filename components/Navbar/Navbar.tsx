import { motion } from "framer-motion";
import useNavbar from "hooks/useNavbar";

export default function Navbar() {
  const navbar = useNavbar();

  const isActive = navbar.state == "active";
  const isNormal = navbar.state == "normal";
  const isHidden = navbar.state == "hidden";

  return (
    <motion.nav
      variants={{
        normal: {
          backgroundColor: "rgba(255,255,255,0)",
          backdropFilter: "blur(0px)",
          borderBottom: "solid 1px rgba(228,228,231,0)",
          paddingTop: 10,
          paddingBottom: 10,
        },
        active: {
          backgroundColor: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(12px)",
          borderBottom: "solid 1px rgba(228,228,231,1)",
          paddingTop: 0,
          paddingBottom: 0,
        },
        hidden: {
          backgroundColor: "rgba(255,255,255,0)",
          backdropFilter: "blur(0px)",
          borderBottom: "solid 1px rgba(228,228,231,0)",
          paddingTop: 10,
          paddingBottom: 10,
        },
      }}
      initial="normal"
      animate={navbar.state}
      className="fixed top-0 left-0 right-0 bg-red-500 z-[999]"
    >
      <div className="w-full h-[4rem] md:h-[4.5rem]">
        <div className="h-full px-12 flex items-center justify-between">
          <div>Navbar</div>
        </div>
      </div>
    </motion.nav>
  );
}
