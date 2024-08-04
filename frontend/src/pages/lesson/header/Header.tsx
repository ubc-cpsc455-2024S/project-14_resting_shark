import { AnimatePresence, motion } from "framer-motion";
import * as React from "react";
import {
  LuX,
  LuChevronLeft,
  LuChevronRight,
  LuPenSquare,
} from "react-icons/lu";
import { Link } from "react-router-dom";
import Content from "../../../class/Content";
import { HeaderProps } from "./Header.d";
import { useLessonContext } from "../../../context/LessonProvider";
import { useEffect } from "react";

export default function Header(props: HeaderProps) {
  return (
    <div className="head">
      <div className=" left-head">
        <ExitButton />
      </div>
      <div className="middle-head">
        <ProgressHeader
          pageNumber={props.pageNumber}
          contentList={props.contentList}
          direction={props.direction}
          setPageNumber={props.setPageNumber}
          startLives={props.startLives}
          startStreak={props.startStreak}
        />
      </div>
      <div className="right-head">
        <EditButton />
      </div>
    </div>
  );
}

function ExitButton() {
  return (
    <div className="left-container">
      <Link className="exit-link" to="/dashboard">
        <button className="exit-button">
          <LuX size={22} color={"#4369ee"} />
          <span>Exit</span>
        </button>
      </Link>
    </div>
  );
}

function ProgressHeader(props: {
  pageNumber: number;
  contentList: Content[];
  direction: string;
  setPageNumber: (pageNumber: number) => void;
  startLives: number;
  startStreak: number;
}) {
  const { streak, setStreak, lives, setLives } = useLessonContext();

  useEffect(() => {
    setStreak(props.startStreak);
    setLives(props.startLives);
  }, []);

  return (
    <div className="progress-container">
      <div className="progress-stats">
        <div className="stat">
          <img src="/Lesson/heart.png" alt="heart" />
          <span>{lives}</span>
        </div>
        <div className="page-count">
          {props.pageNumber + 1}/{props.contentList.length}
        </div>
        <div className="stat">
          <img src="/Lesson/streak.png" alt="streak" />
          <span>{streak}</span>
        </div>
        <div></div>
      </div>
      <ProgressBar
        pageNumber={props.pageNumber}
        contentList={props.contentList}
        direction={props.direction}
        setPageNumber={props.setPageNumber}
      />
    </div>
  );
}

function ProgressBar(props: {
  pageNumber: number;
  contentList: Content[];
  direction: string;
  setPageNumber: (pageNumber: number) => void;
}) {
  const onNextButtonPress = () => {
    if (props.pageNumber + 1 < props.contentList.length) {
      props.setPageNumber(props.pageNumber + 1);
    }
  };

  const onBackButtonPress = async () => {
    if (props.pageNumber - 1 >= 0) {
      props.setPageNumber(props.pageNumber - 1);
    }
  };

  return (
    <div className="progress-bar-container">
      <button onClick={onBackButtonPress}>
        <LuChevronLeft
          className={props.pageNumber == 0 ? "inactive-icon" : "active-icon"}
          size={28}
        />
      </button>
      <div className="progress-bar">
        <AnimatePresence>
          <motion.div
            className="progress-tracker"
            initial={{
              width:
                props.direction === "forward"
                  ? `${(props.pageNumber / props.contentList.length) * 100}%`
                  : `${
                      ((props.pageNumber + 2) / props.contentList.length) * 100
                    }%`,
            }}
            animate={{
              width: `${
                ((props.pageNumber + 1) / props.contentList.length) * 100
              }%`,
            }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>
      </div>
      <button onClick={onNextButtonPress}>
        <LuChevronRight
          className={
            props.pageNumber + 1 == props.contentList.length
              ? "inactive-icon"
              : "active-icon"
          }
          size={28}
        />
      </button>
    </div>
  );
}

function EditButton() {
  return (
    <button className="edit-button">
      <LuPenSquare size={23} />
      <span>Edit Lesson</span>
    </button>
  );
}
