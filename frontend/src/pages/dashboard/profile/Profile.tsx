import LessonsGraph from "./graphs/LessonsGraph";
import StatDisplay from "./graphs/stat/StatDisplay";
import LogoutButton from "./LogoutButton/LogoutButton";
import ProfileDisplay from "./profile-display/ProfileDisplay";
import s from "./Profile.module.css";
import UserInfo from "./user-info/UserInfo";

export default function Profile() {
  return (
    <div className={s.container}>
      <div className={s.statsContainer}>
        <div className={s.header}>
          <h1>My Profile</h1>
          <LogoutButton />
        </div>
        <LessonsGraph />
        <div></div>
      </div>
      <div className={s.profileContainer}>
        <ProfileDisplay />
        <UserInfo />
      </div>
    </div>
  );
}
