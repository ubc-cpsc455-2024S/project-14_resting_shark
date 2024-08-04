import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import s from "./FinishedLesson.module.css";

export default function FinishedLesson() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={s.finishedLessonContainer}>
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        recycle={false}
      />
      <div className={s.messageContainer}>
        <h1 className={s.congratsMessage}>Congratulations!</h1>
        <p className={s.detailsMessage}>You have successfully completed the lesson.</p>
      </div>
    </div>
  );
}
