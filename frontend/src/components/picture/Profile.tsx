import s from "./Profile.module.css";
import * as React from "react";

export default function Profile() {
  return (
    <div className={s.pfp}>
      <img src="./images/goose.png" alt="goose" />
      <img src="./images/mango.png" alt="mango" />
    </div>
  );
}
