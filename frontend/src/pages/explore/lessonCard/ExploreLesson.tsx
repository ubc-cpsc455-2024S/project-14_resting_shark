import { requests } from "../../../api/requestTemplate";
import { useAppSelector } from "../../../redux/hooks";
import s from "./ExploreLesson.module.css";
import * as React from "react";

export default function ExploreLesson(props: { name: string; id: string }) {
  const token = useAppSelector((state) => state.auth.jwtToken);

  const onLessonClick = async () => {
    try {
      const response = await requests.getRequest(
        token,
        `/lesson/copy/${props.id}`
      );

      const lessonsData = await response;
    } catch (error: any) {
      console.error("Error duplicating lesson:", error.message);
    }
  };

  return (
    <div className={s.container}>
      <div className={s.livesContainer}></div>
      <div className={s.bottomContainer}>
        <span className={s.name}>{props.name}</span>
        <span className={s.totalQuestions}>12 questions</span>
        <button onClick={onLessonClick} className={s.continueToLearnButton}>
          Duplicate lesson
        </button>
      </div>
    </div>
  );
}
