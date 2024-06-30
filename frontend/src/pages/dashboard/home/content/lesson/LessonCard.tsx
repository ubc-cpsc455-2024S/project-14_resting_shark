import { Link } from "react-router-dom";

export default function Lesson({ lesson }: any) {
  return (
    <>
      <button>
        <Link to={`/lesson/${lesson.id}`}>Start {lesson.name}</Link>
        <div>{lesson.lives}</div>
        <div>{lesson.totalQuestions}</div>
        <div>{lesson.completedQuestions}</div>
      </button>
    </>
  );
}