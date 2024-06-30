import { LuHome, LuLogOut, LuRocket, LuUserCircle } from "react-icons/lu";
import s from "./Navbar.module.css";

export default function Navbar() {
  return (
    <div className={s.navbarContainer}>
      <div>
        <div className={s.logo}>Lo</div>
        <div className={s.iconsContainer}>
          <LuHome className={`${s.icon} ${s.active}`} />
          <LuRocket className={s.icon} />
          <LuUserCircle className={s.icon} />
        </div>
      </div>
      <div className={s.logoutContainer}>
        <LuLogOut className={`${s.icon} ${s.active}`} />
      </div>
    </div>
  );
}
