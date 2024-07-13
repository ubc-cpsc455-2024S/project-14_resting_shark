import { FaStar } from "react-icons/fa6";
import s from "./ProfileDisplay.module.css";
import { LuPencil } from "react-icons/lu";

export default function ProfileDisplay() {
  const username = "Smug Person";
  const level = 4;
  const exp = 52;

  return (
    <div className={s.container}>
      <div className={s.header}>
        <div className={s.pfp}></div>
        <div className={s.info}>
          <h1>
            {username}
            <button className={s.editButton}>
              <LuPencil />
            </button>
          </h1>
          <div className={s.expLevelContainer}>
            <span className={s.levelContainer}>Level {level}</span>
            <span className={s.expContainer}>
              <FaStar /> {exp} XP
            </span>
          </div>
          <ProgressBar percentage={30} />
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
    </div>
  );
}
