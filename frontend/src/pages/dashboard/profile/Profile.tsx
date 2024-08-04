import LessonsGraph from "./graphs/LessonsGraph";
import ProfileDisplay from "./profile-display/ProfileDisplay";
import s from "./Profile.module.css";
import UserInfo from "./user-info/UserInfo";
import * as React from "react";

export default function Profile() {
  return (
    <div className={s.container}>
      <div className={s.header}>
        <h1>My Profile</h1>
      </div>
      <div className={s.body}>
        <LessonsGraph />
        <ProfileDisplay />
      </div>
    </div>
  );
}
