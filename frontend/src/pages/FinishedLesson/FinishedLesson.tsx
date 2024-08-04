import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Confetti from "react-confetti";
import s from "./FinishedLesson.module.css";

interface FinishedLessonProps {
  title: string;
  lives: number;
  streak: number;
}

export default function FinishedLesson() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { title, lives, streak } = location.state as FinishedLessonProps;

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleReturnToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className={s.finishedLessonContainer}>
      <Confetti width={windowSize.width} height={windowSize.height} recycle={false} />
      <div className={s.messageContainer}>
        <h1 className={s.congratsMessage}> Congratulations! You have successfully completed the lesson. </h1>
        <p className={s.detailsMessage}>
          You have successfully completed the lesson titled: <strong>{title}</strong>
        </p>
        <p className={s.detailsMessage}>
          Remaining Lives: <strong>{lives}</strong>
        </p>
        <p className={s.detailsMessage}>
          Final Streaks: <strong>{streak}</strong>
        </p>
        <button className={s.returnButton} onClick={handleReturnToDashboard}>
          Return to Dashboard
        </button>
      </div>
    </div>
  );
}
