import { LuHome, LuLogOut, LuRocket, LuUserCircle } from "react-icons/lu";
import s from "./Navbar.module.css";

import { useAppDispatch } from "../../../redux/hooks";
import { logout } from "../../../redux/slices/authSlice";

export default function Navbar(props: {
  setPageProfile: () => void;
  setPageHome: () => void;
}) {
  const dispatch = useAppDispatch();

  const handleUserClick = () => {
    props.setPageProfile();
  };

  const handleHomeClick = () => {
    props.setPageHome();
  };

  return (
    <div className={s.navbarContainer}>
      <div>
        <div className={s.logo}>Lo</div>
        <div className={s.iconsContainer}>
          <LuHome
            onClick={handleHomeClick}
            className={`${s.icon} ${s.active}`}
          />
          <LuRocket className={s.icon} />
          <LuUserCircle onClick={handleUserClick} className={s.icon} />
        </div>
      </div>
      <div className={s.logoutContainer}>
        <LuLogOut
          className={`${s.icon} ${s.active}`}
          onClick={() => dispatch(logout())}
        />
      </div>
    </div>
  );
}
