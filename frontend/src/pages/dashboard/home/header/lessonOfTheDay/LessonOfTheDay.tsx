import { LuCheck, LuSparkles } from "react-icons/lu";
import s from "./LessonOfTheDay.module.css";
import Cards from "./cards/Cards";
import * as React from "react";

export default function LessonOfTheDay() {
  return (
    <div className={s.wrapper}>
      <div className={s.lessonOfTheDayContainer}>
        <LessonsDisplay />
        <LessonInfo />
      </div>
    </div>
  );
}

function LessonsDisplay() {
  return (
    <div className={s.lessonDisplay}>
      <Cards />
    </div>
  );
}

function LessonInfo() {
  const activity = [true, true, false, false, false, false, false];
  const streakIndicator = activity.map((item, key) => {
    if (item) {
      return (
        <div key={key} className={`${s.streakIndicator} ${s.completed}`}>
          <LuCheck />
        </div>
      );
    } else {
      return <div key={key} className={`${s.streakIndicator}`}></div>;
    }
  });

  return (
    <div className={s.lessonInfoContainer}>
      <div className={s.lessonTag}>
        <LuSparkles className={s.icon} />
        <div>Lesson Of The Day</div>
      </div>
      <div className={s.title}>June 30: The History of Ducks</div>
      <div className={s.streakContainer}>{streakIndicator}</div>
    </div>
  );
}
