import { LuHome, LuLogOut, LuRocket, LuUserCircle } from "react-icons/lu";
import s from "./Navbar.module.css";

import { useAppDispatch } from "../../../redux/hooks"; 
import { logout } from "../../../redux/slices/authSlice";

export default function Navbar() {
  const dispatch = useAppDispatch();

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
        <LuLogOut className={`${s.icon} ${s.active}`} onClick={() => dispatch(logout())} />
      </div>
    </div>
  );
}
