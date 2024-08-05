import { GoHeartFill } from "react-icons/go";
import { requests } from "../../../api/requestTemplate";
import { useAppSelector } from "../../../redux/hooks";
import s from "./ExploreLesson.module.css";
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ExploreLesson(props: { name: string; id: string; length: number }) {
  const token = useAppSelector((state) => state.auth.jwtToken);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onLessonClick = async () => {
    setIsLoading(true);
    try {
      const response = await requests.getRequest(
        token,
        `/lesson/copy/${props.id}`
      );

      await response;
      navigate(`/lesson/${props.id}`);
    } catch (error: any) {
      console.error("Error duplicating lesson:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={s.container}>
      <div className={s.livesContainer}>
        <GoHeartFill color={"#7683fe"} className={s.heart} />
        <GoHeartFill color={"#7683fe"} className={s.heart} />
        <GoHeartFill color={"#7683fe"} className={s.heart} />
      </div>
      <div className={s.bottomContainer}>
        <span className={s.name}>{props.name}</span>
        <span className={s.totalQuestions}>{props.length} questions</span>
        <button onClick={onLessonClick} className={s.continueToLearnButton}>
          {isLoading ? <div className="loader"></div> : "Make a copy"}
        </button>
      </div>
    </div>
  );
}
