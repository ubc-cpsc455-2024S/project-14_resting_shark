import s from "./ExploreLesson.module.css";
import * as React from "react";

export default function ExploreLesson(props: { name: string }) {
  return (
    <div className={s.container}>
      <div className={s.livesContainer}></div>
      <div className={s.bottomContainer}>
        <span className={s.name}>{props.name}</span>
        <span className={s.totalQuestions}>12 questions</span>
        <button className={s.continueToLearnButton}>Continue to learn</button>
      </div>
    </div>
  );
}
