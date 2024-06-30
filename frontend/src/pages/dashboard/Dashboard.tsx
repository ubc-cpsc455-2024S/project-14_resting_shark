import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";

import { lessonApi } from "../../api/lessonApi";
import LessonCard from "./LessonCard";

export default function Dashboard() {
  const lessons = useAppSelector(state => state.dashboardPage.lessons);
  const token = useAppSelector(state => state.auth.jwtToken);
  const dispatch = useAppDispatch();

  // fetch lessons
  useEffect(() => {
    dispatch(lessonApi.fetchLessons(token));
  }, [dispatch]);

  const lessonCards = lessons.map((item, key) => <LessonCard key={key} lesson={item}/>);

  return (
    <>
      {lessonCards}
    </>
  );
}
