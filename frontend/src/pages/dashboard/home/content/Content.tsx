import { useEffect } from "react";
import { lessonApi } from "../../../../api/lessonApi";
import { useAppSelector, useAppDispatch } from "../../../../redux/hooks";
import LessonCard from "./lesson/LessonCard";

export default function Content() {
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
    <div>
      {lessonCards}
    </div>
  )
}