import ExploreLesson from "../../../../../explore/lessonCard/ExploreLesson";
import s from "./Cards.module.css";
import * as React from "react";

interface CustomComponentProps {
  style?: React.CSSProperties;
  name: string;
  id: string;
  length: number;
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

export default function Cards({ lesson }: any) {
  const length = lesson.content ? lesson.content.length : 0;

  return (
    <div className={s.container}>
      <Card style={botStyle} name={lesson.name} id={lesson._id} length={length} />
      <Card style={topStyle} name={lesson.name} id={lesson._id} length={length} />
    </div>
  );
}

const Card: React.FC<CustomComponentProps> = ({ style, name, id, length }) => {
  return (
    <div className={s.cardContainer} style={style}>
      <ExploreLesson name={name} id={id} length={length} />
    </div>
  );
};
