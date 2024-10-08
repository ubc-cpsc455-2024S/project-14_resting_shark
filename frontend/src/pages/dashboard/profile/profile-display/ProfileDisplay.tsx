import { FaStar } from "react-icons/fa6";
import s from "./ProfileDisplay.module.css";
import { LuPencil } from "react-icons/lu";
import { useState, useEffect } from "react";
import { useAppSelector } from "../../../../redux/hooks";
import { userApi } from "../../../../api/userApi";
import UserEditModal from "../user-edit/UserEditModal";
import * as React from "react";
import { requests } from "../../../../api/requestTemplate";

export default function ProfileDisplay() {
  const token = useAppSelector((state) => state.auth.jwtToken);
  const [username, setUsername] = useState("");
  const [totalExp, setTotalExp] = useState(0);

  const [isUserEditModalOpen, setUserEditModalOpen] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    profilePicture: "",
  });

  const [base, setBase] = useState("./images/goose.png");
  const [hat, setHat] = useState("");
  const [item, setItem] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#ffc3a3");

  // TODO: move this to the outside component, since this api call will return both the user data and the graph data
  const fetchData = async () => {
    try {
      const profileData = await userApi.getProfileData(token, "", "");
      setUsername(profileData.username);
      setUser({
        username: profileData.username,
        email: profileData.email,
        profilePicture: profileData.profilePicture,
      });
      setTotalExp(profileData.totalExp);

      const pictureData = await requests.getRequest(token, "/user/profile");

      setBase(pictureData.baseImage);
      setHat(pictureData.accessory);
      setItem(pictureData.heldItem);
      setBackgroundColor(pictureData.bgColor);
    } catch (e: any) {
      console.error(e.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const handleEditButtonClick = () => {
    setUserEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setUserEditModalOpen(false);
    fetchData();
  };

  //const handleSave = (updatedUserInfo: any) => {
  //  // Handle saving the updated user info (e.g., update state, make API call)
  //  setUsername(updatedUserInfo.username);
  //};

  const level = Math.floor(totalExp / 1000);

  return (
    <div className={s.container}>
      <div className={s.header}>
        <div className={s.pfp} style={{ backgroundColor: backgroundColor }}>
          <img className={s.img} src={base} alt="goose" />
          {hat !== "" && <img className={s.hat} src={hat} alt="hat" />}
          {item !== "" && <img className={s.img} src={item} alt="item" />}
        </div>
        <div className={s.info}>
          <h1>
            {username}
            <button className={s.editButton} onClick={handleEditButtonClick}>
              <LuPencil />
            </button>
          </h1>
          <div className={s.expLevelContainer}>
            <span className={s.levelContainer}>Level {level}</span>
            <span className={s.expContainer}>
              <FaStar /> {totalExp} XP
            </span>
          </div>
          <ProgressBar percentage={((totalExp % 1000) / 1000) * 100} />
        </div>
      </div>
      <UserEditModal
        isOpen={isUserEditModalOpen}
        onClose={handleCloseModal}
        user={user}
        setBase={setBase}
        setHat={setHat}
        setItem={setItem}
        base={base}
        hat={hat}
        item={item}
        backgroundColor={backgroundColor}
        setBackgroundColor={setBackgroundColor}
      />
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
