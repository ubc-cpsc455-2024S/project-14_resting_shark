import { Link } from "react-router-dom";
import s from "./LessonCard.module.css";
import { LuDot } from "react-icons/lu";
import { GoHeartFill } from "react-icons/go";

export default function Lesson({ lesson }: any) {
  const TOTAL_LIVES = 3;

  const lives = Array.from({ length: TOTAL_LIVES }, (_, index) => {
    if (index < lesson.lives) {
      return <GoHeartFill className={s.heart} key={index} />;
    } else {
      return <LuDot className={s.dot} key={index} />;
    }
  });

  return (
    <Link className={s.link} to={`/lesson/${lesson._id}`}>
      <div className={s.container}>
        <div className={s.livesContainer}>{lives}</div>
        <div className={s.bottomContainer}>
          <span className={s.name}>{lesson.name}</span>
          <span className={s.totalQuestions}>
            {lesson.totalQuestions} questions
          </span>
          <ProgressBar
            percentage={
<<<<<<< Updated upstream
              (lesson.completedQuestions / lesson.totalQuestions) * 100
=======
              (props.lesson.completedPages / props.lesson.totalPages) *
              100
>>>>>>> Stashed changes
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
