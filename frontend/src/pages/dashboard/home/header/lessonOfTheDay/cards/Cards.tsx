import { AstronomyLesson } from "../../../../../../api/mock/astronomy";
import LessonCard from "../../../content/lesson/LessonCard";
import s from "./Cards.module.css";

interface CustomComponentProps {
  style?: React.CSSProperties;
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
  return (
    <div className={s.container}>
      <Card style={botStyle} />
      <Card style={topStyle} />
    </div>
  );
}

const Card: React.FC<CustomComponentProps> = ({ style }) => {
  return (
    <div className={s.cardContainer} style={style}>
      <LessonCard lesson={AstronomyLesson} isFirst={false} />
    </div>
  );
};
