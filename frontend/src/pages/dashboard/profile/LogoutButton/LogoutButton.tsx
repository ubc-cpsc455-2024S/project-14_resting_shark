import { LuLogOut } from "react-icons/lu";
import s from "./LogoutButton.module.css";
import * as React from "react";

export default function LogoutButton() {
  return (
    <button className={s.button}>
      Logout
      <LuLogOut className={s.icon} />
    </button>
  );
}
