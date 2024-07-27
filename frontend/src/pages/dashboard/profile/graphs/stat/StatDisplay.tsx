import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";
import { LuMinus } from "react-icons/lu";
import s from "./StatDisplay.module.css";
import * as React from "react";

export default function StatDisplay(props: {
  num: number;
  label: string;
  change: 0 | 1 | -1 | number;
}) {
  return (
    <div className={s.container}>
      {props.change == 0 ? (
        <div className={`${s.iconContainer} ${s.iconAvg}`}>
          <LuMinus />
        </div>
      ) : props.change == -1 ? (
        <div className={`${s.iconContainer} ${s.iconMin}`}>
          <FaArrowDownLong />
        </div>
      ) : (
        <div className={`${s.iconContainer} ${s.iconMax}`}>
          <FaArrowUpLong />
        </div>
      )}
      <div className={s.labelContainer}>
        <span className={s.num}>{props.num}</span>
        <span className={s.label}>{props.label}</span>
      </div>
    </div>
  );
}
