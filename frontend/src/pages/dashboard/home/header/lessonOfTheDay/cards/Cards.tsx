import { useEffect, useState } from "react";
import { lessonApi } from "../../../../../../api/lessonApi";
import ExploreLesson from "../../../../../explore/lessonCard/ExploreLesson";
import s from "./Cards.module.css";
import * as React from "react";

interface CustomComponentProps {
  style?: React.CSSProperties;
  name: string;
  id: string;
}

const topStyle = {
  transform: "rotate(-12.98deg)",
  left: "0",
  top: "5%",
};

const botStyle = {
  top: "0",
  left: "15%",
  opacity: "0.85",
};

export default function Cards() {
  const [lesson, setLesson] = useState({name: "", _id: ""});

  // get the lesson name of lesson of the day
  useEffect(() => {
    async function fetchData() {
      try {
        const lesson = await lessonApi.fetchLessonOfTheDay("");
        setLesson(lesson);
      } catch (e: any) {
        console.error(e.message);
      }
    }
    fetchData();
  }, []);

  return (
    <div className={s.container}>
      <Card style={botStyle} name={lesson.name} id={lesson._id} />
      <Card style={topStyle} name={lesson.name} id={lesson._id} />
    </div>
  );
}

const Card: React.FC<CustomComponentProps> = ({ style, name, id }) => {
  return (
    <div className={s.cardContainer} style={style}>
      <ExploreLesson name={name} id={id} />
    </div>
  );
};
