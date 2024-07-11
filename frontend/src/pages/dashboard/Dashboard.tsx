import { useState } from "react";
import s from "./Dashboard.module.css";

import Home from "./home/Home";
import Navbar from "./navbar/Navbar";
import Profile from "./profile/Profile";

export default function Dashboard() {
  const [page, setPage] = useState(<Home />);

  const setPageProfile = () => {
    setPage(<Profile />);
  };

  const setPageHome = () => {
    setPage(<Home />);
  };

  return (
    <>
      <div className={s.mainPage}>
        <div className={s.navbarContainer}>
          <Navbar setPageProfile={setPageProfile} setPageHome={setPageHome} />
        </div>
        {page}
      </div>
    </>
  );
}
