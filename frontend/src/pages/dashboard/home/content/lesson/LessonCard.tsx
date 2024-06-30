import { Link } from "react-router-dom";
import s from "./LessonCard.module.css";
import { LuHeart, LuDot } from "react-icons/lu";

export default function Lesson({ lesson }: any) {
  const TOTAL_LIVES = 3;

  const lives = Array.from({ length: TOTAL_LIVES }, (_, index) => {
    if (index < lesson.lives) {
      return <LuHeart key={index} />;
    } else {
      return <LuDot key={index} />;
    }
  });


  return (
    <Link to={`/lesson/${lesson.id}`}>
      <div className={s.container}>
        {lives}
        <div>
          {lesson.name}
        </div>
        <div>
          {lesson.totalQuestions} questions
        </div>
        <ProgressBar percentage={lesson.completedQuestions / lesson.totalQuestions * 100} />
        <button className={s.continueToLearnButton}>
          Continue to learn
        </button>
      </div>
    </Link>
  );
}

function ProgressBar({ percentage }:{percentage: number}) {
  return (
    <div>Percentage: {Math.floor(percentage)}</div>
  )
}
