import { Link } from "react-router-dom";

export default function Lesson({ lesson }: any) {
  return (
    <>
      <button>
        <Link to={`/lesson/${lesson.id}`}>Start {lesson.name}</Link>
      </button>
    </>
  );
}