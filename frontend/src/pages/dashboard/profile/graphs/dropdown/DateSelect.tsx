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

function getDateRange(period: string) {
  const currentDate = new Date();
  const options: Intl.DateTimeFormatOptions = { month: "long", day: "numeric" };

  let startDate = new Date(currentDate);

  switch (period) {
    case "This week":
      startDate.setDate(currentDate.getDate() - currentDate.getDay());
      break;
    case "Last week":
      const lastWeekStart = new Date(currentDate);
      lastWeekStart.setDate(currentDate.getDate() - currentDate.getDay() - 7);
      const lastWeekEnd = new Date(lastWeekStart);
      lastWeekEnd.setDate(lastWeekStart.getDate() + 6);
      return {
        startDate: lastWeekStart.toLocaleDateString("en-US", options),
        endDate: lastWeekEnd.toLocaleDateString("en-US", options),
      };
    case "Last last week":
      const lastLastWeekStart = new Date(currentDate);
      lastLastWeekStart.setDate(
        currentDate.getDate() - currentDate.getDay() - 14
      );
      const lastLastWeekEnd = new Date(lastLastWeekStart);
      lastLastWeekEnd.setDate(lastLastWeekStart.getDate() + 6);
      return {
        startDate: lastLastWeekStart.toLocaleDateString("en-US", options),
        endDate: lastLastWeekEnd.toLocaleDateString("en-US", options),
      };
    default:
      throw new Error(
        "Invalid period specified. Use 'This week', 'Last week', or 'Last last week'"
      );
  }

  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);

  return {
    startDate: startDate.toLocaleDateString("en-US", options),
    endDate: endDate.toLocaleDateString("en-US", options),
  };
}

export default function DateSelect(props: {
  interval: string;
  setInterval: React.Dispatch<React.SetStateAction<string>>;
  selection: string;
  setSelection: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const scope = useMenuAnimation(isOpen);
  // selection is the current week that's being display

  const thisWeekRange = getDateRange("This week");
  const lastWeekRange = getDateRange("Last week");
  const lastlastWeekRange = getDateRange("Last last week");

  function getDisplay(selection: string) {
    switch (selection) {
      case "This week":
        return thisWeekRange;
      case "Last week":
        return lastWeekRange;
      case "Last last week":
        return lastlastWeekRange;
      default:
        return thisWeekRange;
    }
  }

  return (
    <nav className={s.menu} ref={scope}>
      <div />
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={s.placeholder}>
          <LuCalendarClock size={16} />
          {getDisplay(props.selection).startDate} - {getDisplay(props.selection).endDate}
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
        <li
          onClick={() => {
            props.setSelection("This week");
            setIsOpen(false);
          }}
        >
          {thisWeekRange.startDate} - {thisWeekRange.endDate}
        </li>
        <li
          onClick={() => {
            props.setSelection("Last week");
            setIsOpen(false);
          }}
        >
          {lastWeekRange.startDate} - {lastWeekRange.endDate}
        </li>
        <li
          onClick={() => {
            props.setSelection("Last last week");
            setIsOpen(false);
          }}
        >
          {lastlastWeekRange.startDate} - {lastlastWeekRange.endDate}
        </li>
      </ul>{" "}
    </nav>
  );
}
