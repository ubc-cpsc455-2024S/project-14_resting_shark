import { LuCheck, LuSparkles } from "react-icons/lu";
import s from "./LessonOfTheDay.module.css";

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
  return <div className={s.lessonDisplay}></div>;
}

function LessonInfo() {
  const activity = [1, 1, 0, 0, 0, 0, 0];
  const streakIndicator = activity.map((item, key) => {
    if (item === 1) {
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
