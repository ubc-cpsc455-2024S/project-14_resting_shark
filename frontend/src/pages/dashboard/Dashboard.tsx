import s from "./Dashboard.module.css";

import Home from "./home/Home";
import Navbar from "./navbar/Navbar";

export default function Dashboard() {
  return (
    <>
      <div className={s.mainPage}>
        <div className={s.navbarContainer}>
          <Navbar />
        </div>
        <Home />
      </div>
    </>
  );
}
