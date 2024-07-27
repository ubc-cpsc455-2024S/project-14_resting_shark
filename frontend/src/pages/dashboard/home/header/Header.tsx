import LessonOfTheDay from "./lessonOfTheDay/LessonOfTheDay";
import s from "./Header.module.css";
import Upload from "../upload/Upload";
import * as React from "react";

export default function Header() {
  return (
    <div className={`${s.headerContainer}`}>
      <Upload />
      <LessonOfTheDay />
    </div>
  );
}
