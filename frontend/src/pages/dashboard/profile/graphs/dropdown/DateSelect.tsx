import { motion, stagger, useAnimate } from "framer-motion";
import { useEffect, useState } from "react";
import s from "./DateSelect.module.css";
import { LuCalendarClock, LuChevronDown } from "react-icons/lu";
import * as React from "react";

const staggerMenuItems = stagger(0.1, { startDelay: 0.15 });

function useMenuAnimation(isOpen: boolean) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(".arrow", { rotate: isOpen ? 180 : 0 }, { duration: 0.2 });

    animate(
      "ul",
      {
        clipPath: isOpen
          ? "inset(0% 0% 0% 0% round 10px)"
          : "inset(10% 50% 90% 50% round 10px)",
      },
      {
        type: "spring",
        bounce: 0,
        duration: 0.5,
      }
    );

    animate(
      "li",
      isOpen
        ? { opacity: 1, scale: 1, filter: "blur(0px)" }
        : { opacity: 0, scale: 0.3, filter: "blur(20px)" },
      {
        duration: 0.2,
        delay: isOpen ? staggerMenuItems : 0,
      }
    );
  }, [isOpen]);

  return scope;
}

export default function DateSelect(props: {
  interval: string;
  setInterval: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const scope = useMenuAnimation(isOpen);

  return (
    <nav className={s.menu} ref={scope}>
      <div />
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={s.placeholder}>
          <LuCalendarClock size={16} />
          {props.interval}
        </div>
        <div
          className={`${s.arrow} arrow`}
          style={{ transformOrigin: "50% 55%" }}
        >
          <LuChevronDown size={18} />
        </div>
      </motion.button>
      <ul
        style={{
          pointerEvents: isOpen ? "auto" : "none",
          clipPath: "inset(10% 50% 90% 50% round 10px)",
        }}
        className={s.dropdown}
      >
        <li>This week</li>
        <li>Last week</li>
      </ul>{" "}
    </nav>
  );
}
