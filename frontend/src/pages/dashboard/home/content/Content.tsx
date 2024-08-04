import { useEffect } from "react";
import { lessonApi } from "../../../../api/lessonApi";
import { useAppSelector, useAppDispatch } from "../../../../redux/hooks";
import LessonCard from "./lesson/LessonCard";
import s from "./Content.module.css";
import * as React from "react";

export default function Content() {
  const lessons = useAppSelector((state) => state.dashboardPage.lessons);
  const token = useAppSelector((state) => state.auth.jwtToken);
  const dispatch = useAppDispatch();

  // fetch lessons
  useEffect(() => {
    dispatch(lessonApi.fetchLessons(token));
  }, [dispatch]);

  const lessonCards = lessons.map((item, index) => (
    <LessonCard isFirst={index === 0} lesson={item} key={index} />
  ));

  console.log(lessons)

  return (
    <div className={s.recentLessonsWrapper}>
      <div className={s.recentLessonsLabel}>Recent Lessons</div>
      <div className={s.lessonCards}>{lessonCards}</div>
    </div>
  );
}
