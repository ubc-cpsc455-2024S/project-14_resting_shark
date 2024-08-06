import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import s from "./FinishedLesson.module.css";
import { requests } from "../../api/requestTemplate";
import { useAppSelector } from "../../redux/hooks";

interface FinishedLessonProps {
  title: string;
  lives: number;
  streak: number;
  lessonId: string | undefined;
}

export default function FinishedLesson() {
  const token = useAppSelector((state) => state.auth.jwtToken);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { lives, streak, lessonId } = location.state as FinishedLessonProps;

  const updateLessonHistory = async () => {
    const hasCompleted = await requests.getRequest(
      token,
      `/lessonHistory/${lessonId}`
    );

    if (!hasCompleted) {
      await requests.postRequest(token, `/lessonHistory/${lessonId}`);
      console.log("updated history");
    } else {
      console.log("already completed");
    }
  };

  useEffect(() => {
    updateLessonHistory();

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
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        recycle={false}
      />
      <motion.div
        className={s.celebrationLogoContainer}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <div className={s.celebrationLogoWrapper}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYNXe86iDsAQVdnWTWCuEvDnZMllSpkV9Deg&s"
            alt="Celebration"
            className={s.celebrationLogo}
          />
        </div>
      </motion.div>
      <motion.div
        className={s.messageContainer}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={s.congratsMessage}>
          Congratulations! You have successfully completed the lesson.
        </h1>
        <motion.div
          className={s.detailsBox}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className={s.detailsMessage}>
            Remaining Lives: <strong>{lives}</strong>
          </p>
          <p className={s.detailsMessage}>
            Final Streaks: <strong>{streak}</strong>
          </p>
        </motion.div>
        <motion.button
          className={s.returnButton}
          onClick={handleReturnToDashboard}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Return to Dashboard
        </motion.button>
      </motion.div>
    </div>
  );
}
