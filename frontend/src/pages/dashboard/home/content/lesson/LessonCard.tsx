import { useNavigate } from "react-router-dom";
import s from "./LC.module.css";
import { LuDot } from "react-icons/lu";
import { GoHeartFill } from "react-icons/go";
import * as React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaTrash } from "react-icons/fa6";
import { useState } from "react";
import { requests } from "../../../../../api/requestTemplate";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { lessonApi } from "../../../../../api/lessonApi";

export default function Lesson(props: { lesson: any; isFirst: boolean }) {
  const TOTAL_LIVES = 3;
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const token = useAppSelector((state) => state.auth.jwtToken);
  const dispatch = useAppDispatch();

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

  const onButtonClick = () => {
    navigate(`/lesson/${props.lesson._id}`);
  };

  const onDeleteButtonClick = async () => {
    try {
      await requests.deleteRequest(token, `/lesson/${props.lesson._id}`);
    } catch (error: any) {
      console.error("Error deleting lesson:", error.message);
    } finally {
      dispatch(lessonApi.fetchLessons(token));
    }
  };

  const onDotButtonClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`${s.link} ${props.isFirst ? s.firstLink : ""}`}>
      <div className={s.container}>
        <div className={s.livesContainer}>
          <div>{lives}</div>
          <button className={s.button} onClick={onDotButtonClick}>
            <HiDotsHorizontal size={22} />
          </button>
          <div
            className={`${s.dropdown}`}
            style={
              isMenuOpen ? { visibility: "visible" } : { visibility: "hidden" }
            }
            onClick={onDeleteButtonClick}
          >
            <FaTrash />
            Delete
          </div>
        </div>
        <div className={s.bottomContainer}>
          <span className={s.name}>{props.lesson.name}</span>
          <span className={s.totalQuestions}>
            {props.lesson.totalPages} questions
          </span>
          <ProgressBar
            percentage={
              (props.lesson.completedPages / props.lesson.totalPages) * 100
            }
          />
          <button className={s.continueToLearnButton} onClick={onButtonClick}>
            Continue to learn
          </button>
        </div>
      </div>
    </div>
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
