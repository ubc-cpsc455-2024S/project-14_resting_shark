import { Link } from "react-router-dom";
import s from "./LessonCard.module.css";
import { LuDot } from "react-icons/lu";
import { GoHeartFill } from "react-icons/go";

export default function Lesson(props: { lesson: any; isFirst: boolean }) {
  const TOTAL_LIVES = 3;

  const lives = Array.from({ length: TOTAL_LIVES }, (_, index) => {
    if (index < props.lesson.lives) {
      return (
        <GoHeartFill
          color={props.isFirst ? "rgba(255, 255, 255, 0.7)" : ""}
          className={s.heart}
          key={index}
        />
      );
    } else {
      return (
        <LuDot
          color={props.isFirst ? "rgba(255, 255, 255, 0.7)" : ""}
          className={s.dot}
          key={index}
        />
      );
    }
  });

  return (
    <Link
      className={`${s.link} ${props.isFirst ? s.firstLink : ""}`}
      to={`/lesson/${props.lesson._id}`}
    >
      <div className={s.container}>
        <div className={s.livesContainer}>{lives}</div>
        <div className={s.bottomContainer}>
          <span className={s.name}>{props.lesson.name}</span>
          <span className={s.totalQuestions}>
            {props.lesson.totalQuestions} questions
          </span>
          <ProgressBar
            percentage={
              (props.lesson.completedQuestions / props.lesson.totalQuestions) *
              100
            }
          />
          <button className={s.continueToLearnButton}>Continue to learn</button>
        </div>
      </div>
    </Link>
  );
}

function ProgressBar({ percentage }: { percentage: number }) {
  return (
    <div className={s.progressBarContainer}>
      <div className={s.progressContainer}>
        <div
          className={s.progressIndicator}
          style={
            percentage === 100
              ? {
                  backgroundColor: "#29CC60",
                  width: `${Math.floor(percentage)}%`,
                }
              : { width: `${Math.floor(percentage)}%` }
          }
        ></div>
      </div>
      <span className={s.percentage}>{Math.floor(percentage)}%</span>
    </div>
  );
}
