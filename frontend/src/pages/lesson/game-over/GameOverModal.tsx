import React, { useEffect, useState } from "react";
import s from "./GameOverModal.module.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function GameOverModal(props: {
  time: number;
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const countdownDuration = 300; // 5 minutes

  const [time, setTime] = useState<number>(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (props.time !== null) {
      const now = new Date().getTime();
      const elapsed = (now - props.time) / 1000;
      const remainingTime = countdownDuration - Math.floor(elapsed);

      setTime(remainingTime);

      const timer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(timer);
            props.setIsGameOver(false);
            return 0;
          } else {
            return prevTime - 1;
          }
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [props.time]);

  if (time === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className={s.container}>
      <div className={s.backdrop}></div>
      <div className={s.modal}>
        <h1>Game Over!</h1>
        <p>
          Lives reset in: {`${Math.floor(time / 60)}`.padStart(2, "0")}:
          {`${time % 60}`.padStart(2, "0")}
        </p>
        <motion.button
          layout
          transition={{ duration: 0.2 }}
          className="next-button"
          style={{ backgroundColor: "#E7EAF6" }}
          onClick={() => navigate(`/dashboard`)}
        >
          <div
            className="inner-button"
            style={{
              backgroundColor: "#ff278a",
              paddingLeft: "2vw",
              paddingRight: "2vw",
            }}
          >
            Back to dashboard
          </div>
        </motion.button>
      </div>
    </div>
  );
}
