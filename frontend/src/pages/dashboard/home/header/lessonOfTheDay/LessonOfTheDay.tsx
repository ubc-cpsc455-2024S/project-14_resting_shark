import { LuSparkles } from "react-icons/lu";
import { useState, useEffect } from "react";
import { lessonApi } from "../../../../../api/lessonApi";
import s from "./LessonOfTheDay.module.css";
import Cards from "./cards/Cards";
import * as React from "react";

export default function LessonOfTheDay() {
  const [lesson, setLesson] = useState({ name: "", _id: "" });

  // get the lesson name of lesson of the day
  useEffect(() => {
    async function fetchData() {
      try {
        const lesson = await lessonApi.fetchLessonOfTheDay("");
        setLesson(lesson);
      } catch (e: any) {
        console.error(e.message);
      }
    }
    fetchData();
  }, []);

  return (
    <div className={s.wrapper}>
      <div className={s.lessonOfTheDayContainer}>
        <LessonsDisplay lesson={lesson} />
        <LessonInfo lesson={lesson} />
      </div>
    </div>
  );
}

function LessonsDisplay({ lesson }: any) {
  return (
    <div className={s.lessonDisplay}>
      <Cards lesson={lesson} />
    </div>
  );
}

function LessonInfo({ lesson }: any) {
  const date = new Date();

  return (
    <div className={s.lessonInfoContainer}>
      <div className={s.lessonTag}>
        <LuSparkles className={s.icon} />
        <div>Lesson Of The Day</div>
      </div>
      <div className={s.title}>
        {date.toLocaleDateString("en-US", { month: "long", day: "numeric" })}:{" "}
        {lesson.name}
      </div>
    </div>
  );
}
