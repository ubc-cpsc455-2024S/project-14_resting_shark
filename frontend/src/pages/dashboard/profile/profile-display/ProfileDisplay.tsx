import { FaStar } from "react-icons/fa6";
import s from "./ProfileDisplay.module.css";
import { LuPencil } from "react-icons/lu";
import { useState, useEffect } from "react";
import { useAppSelector } from "../../../../redux/hooks";
import { userApi } from "../../../../api/userApi";

  export default function ProfileDisplay() {
    const token = useAppSelector((state) => state.auth.jwtToken);
    const [username, setUsername] = useState("");

    useEffect(() => {
      async function fetchData() {
        try {
          const profileData = await userApi.getProfileData(token);
          setUsername(profileData.username);
        } catch (e: any) {
          console.error(e.message);
        }
      }
      fetchData();
    }, [token]);

  const level = 4;
  const exp = 52;

  const goose = "./images/goose.png";
  const hat = "./images/mango.png";

  return (
    <div className={s.container}>
      <div className={s.header}>
        <div className={s.pfp}>
          <img className={s.img} src={goose} alt="goose" />
          <img className={s.hat} src={hat} alt="goose" />
        </div>
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
