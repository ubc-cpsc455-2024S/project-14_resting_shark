import LessonsGraph from "./graphs/LessonsGraph";
import LogoutButton from "./LogoutButton/LogoutButton";
import s from "./Profile.module.css";

export default function Profile() {
  return (
    <div className={s.container}>
      <div className={s.statsContainer}>
        <div className={s.header}>
          <h1>User Profile</h1>
          <LogoutButton />
        </div>
        <LessonsGraph />
      </div>
      <div className={s.profileContainer}>
        <div></div>
      </div>
    </div>
  );
}
