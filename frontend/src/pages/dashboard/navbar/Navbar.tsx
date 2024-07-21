import { LuHome, LuLogOut, LuRocket, LuUserCircle } from "react-icons/lu";
import s from "./Navbar.module.css";

import { useAppDispatch } from "../../../redux/hooks";
import { logout } from "../../../redux/slices/authSlice";
import { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { IoIosRocket } from "react-icons/io";

export default function Navbar(props: {
  setPageProfile: () => void;
  setPageHome: () => void;
}) {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState("home");

  const handleUserClick = () => {
    setPage("profile");
    props.setPageProfile();
  };

  const handleHomeClick = () => {
    setPage("home");
    props.setPageHome();
  };

  return (
    <div className={s.navbarContainer}>
      <div className={s.container}>
        <div className={s.logo}>Mangoose</div>
        <div className={s.iconsContainer}>
          <div
            onClick={handleHomeClick}
            className={`${s.navButton} ${page == "home" ? s.active : ""}`}
          >
            <AiFillHome className={`${s.icon}`} />
            <span>Home</span>
          </div>
          <div
            className={`${s.navButton} ${page == "explore" ? s.active : ""}`}
          >
            <IoIosRocket className={s.icon} />
            <span>Explore</span>
          </div>
          <div
            onClick={handleUserClick}
            className={`${s.navButton} ${page == "profile" ? s.active : ""}`}
          >
            <LuUserCircle
              className={`${s.icon} ${page == "profile" ? s.active : ""}`}
            />
            <span>Profile</span>
          </div>
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
