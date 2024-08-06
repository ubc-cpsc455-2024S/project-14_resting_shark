import { useEffect } from "react";
import { lessonApi } from "../../../../api/lessonApi";
import { useAppSelector, useAppDispatch } from "../../../../redux/hooks";
import LessonCard from "./lesson/LessonCard";
import s from "./Content.module.css";
import * as React from "react";

interface SearchAndSortProps {
  searchValue: string,
  sortValue: string,
}

export default function Content({ searchValue, sortValue }: SearchAndSortProps) {
  const lessons = useAppSelector((state) => state.dashboardPage.lessons);
  const token = useAppSelector((state) => state.auth.jwtToken);
  const dispatch = useAppDispatch();

  // fetch lessons
  useEffect(() => {
    dispatch(lessonApi.fetchLessons(token));
  }, [dispatch]);

  debugger;

  let lessonsCopy = JSON.parse(JSON.stringify(lessons));

  const sortedLessons = sortValue === "recent"
  ? lessonsCopy 
  : lessonsCopy.sort((a: any, b: any) => {
      if (a.name < b.name) return -1; 
      if (a.name > b.name) return 1;  
      return 0;
    });

  const filteredLessons = sortedLessons.filter((lesson: any) => {
    return lesson.name.includes(searchValue);
  });

  const lessonCards = filteredLessons.map((item: any, index: number) => (
    <LessonCard isFirst={index === 0} lesson={item} key={index} />
  ));

  return (
    <div className={s.recentLessonsWrapper}>
      <div className={s.recentLessonsLabel}>Recent Lessons</div>
      <div className={s.lessonCards}>{lessonCards}</div>
    </div>
  );
}
