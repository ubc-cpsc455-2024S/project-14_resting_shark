import { useState } from "react";
import s from "./Dashboard.module.css";

import Home from "./home/Home";
import Navbar from "./navbar/Navbar";
import Profile from "./profile/Profile";
import * as React from "react";
import Explore from "../explore/Explore";

export default function Dashboard() {
  const [page, setPage] = useState(<Home />);

  const setPageProfile = () => {
    setPage(<Profile />);
  };

  const setPageHome = () => {
    setPage(<Home />);
  };

  const setPageExplore = () => {
    setPage(<Explore />);
  };

  return (
    <>
      <div className={s.mainPage}>
        <div className={s.navbarContainer}>
          <Navbar
            setPageExplore={setPageExplore}
            setPageProfile={setPageProfile}
            setPageHome={setPageHome}
          />
        </div>
        {page}
      </div>
    </>
  );
}
