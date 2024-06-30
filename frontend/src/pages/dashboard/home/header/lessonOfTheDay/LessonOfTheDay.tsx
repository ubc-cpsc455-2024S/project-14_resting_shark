import { LuCheck, LuSparkles } from "react-icons/lu"
import s from "./LessonOfTheDay.module.css"

export default function LessonOfTheDay() {
  return (
    <div>
      <LessonsDisplay />
      <LessonInfo />
    </div>
  )
}

function LessonsDisplay() {
  return (
    <div>
      placeholder lessons image
    </div>
  )
}

function LessonInfo() {
  const activity = [1, 1, 0, 0, 0, 0, 0]
  const streakIndicator = activity.map(item => {
    if (item === 1) {
      return (
      <div className={`${s.streakIndicator} ${s.completed}`} >
        <LuCheck />
      </div>
      )
    } else {
      return (
      <div className={`${s.streakIndicator}`}></div>
      )
    }
  })

  return (
    <div>
      <div>
        <LuSparkles />
        <div>Lesson Of The Day</div>
      </div>
      <div>June 30: The History of Ducks</div>
      <div>
        {streakIndicator}
      </div>
      
    </div>
  )
}

