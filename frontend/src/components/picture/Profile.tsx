import s from "./Profile.module.css";

export default function Profile() {
  return (
    <div className={s.pfp}>
      <img src="./images/goose.png" alt="goose" />
      <img src="./images/mango.png" alt="mango" />
    </div>
  );
}
