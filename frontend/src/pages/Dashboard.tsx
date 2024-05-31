import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      <button>
        <Link to="/lesson">Start Lesson</Link>
      </button>
    </>
  );
}
