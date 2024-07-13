import { LuLogOut } from "react-icons/lu";
import s from "./LogoutButton.module.css";

export default function LogoutButton() {
  return (
    <button className={s.button}>
      Logout
      <LuLogOut className={s.icon} />
    </button>
  );
}
