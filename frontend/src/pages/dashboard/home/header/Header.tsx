import GreetingAndSearch from "./greetingAndSearch/GreetingAndSearch";
import LessonOfTheDay from "./lessonOfTheDay/LessonOfTheDay";

import s from "./Header.module.css"

export default function Header() {
  return (
    <div className={`${s.headerContainer}`}>
      <GreetingAndSearch />
      <LessonOfTheDay />
    </div>
  )
}