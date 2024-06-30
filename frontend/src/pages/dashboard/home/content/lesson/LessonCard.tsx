import { Link } from "react-router-dom";
import s from "./LessonCard.module.css";

export default function Lesson({ lesson }: any) {
  return (
    <Link className={s.container} to={`/lesson/${lesson.id}`}>
      <div>{lesson.lives}</div>
      <div>{lesson.totalQuestions}</div>
      <div>{lesson.completedQuestions}</div>
      {lesson.name}
    </Link>
  );
}
