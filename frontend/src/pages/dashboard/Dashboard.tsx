import { useState, useEffect } from "react";

import { lessonApi } from "../../api/lessonApi";
import LessonCard from "./LessonCard";

export default function Dashboard() {
    const [lessons, setLessons] = useState([]);

    // fetch lessons
    useEffect(() => {
      async function fetchLesson() {
        try {
          const response = await lessonApi.getLessons("jwtTokenPlaceholder");
          setLessons(response.data);
        } catch (e: any) {
          console.log("Lesson: " + e.message);
        }
      }
      fetchLesson();
    }, []);

  const lessonCards = lessons.map((item, key) => <LessonCard key={key} lesson={item}/>);

  return (
    <>
      {lessonCards}
    </>
  );
}
