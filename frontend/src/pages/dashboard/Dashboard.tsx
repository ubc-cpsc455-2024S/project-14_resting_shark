import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import s from "./Dashboard.module.css";

import { lessonApi } from "../../api/lessonApi";
import LessonCard from "./LessonCard";
import Home from "./home/Home";
import Navbar from "./navbar/Navbar";

export default function Dashboard() {
  const lessons = useAppSelector((state) => state.dashboardPage.lessons);
  const token = useAppSelector((state) => state.auth.jwtToken);
  const dispatch = useAppDispatch();

  // fetch lessons
  useEffect(() => {
    dispatch(lessonApi.fetchLessons(token));
  }, [dispatch]);

  const lessonCards = lessons.map((item, key) => (
    <LessonCard key={key} lesson={item} />
  ));

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
