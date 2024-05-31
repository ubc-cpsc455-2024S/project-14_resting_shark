import { Link } from "react-router-dom";
import "./Lesson.css";
import {
  LuBot,
  LuChevronLeft,
  LuChevronRight,
  LuPenSquare,
  LuX,
} from "react-icons/lu";
import { useState } from "react";
import {
  Content,
  DragAndDrop,
  Info,
  Intro,
  Matching,
  MultipleChoice,
} from "../class/Content";
import Information from "../components/Information";
import DragAndDropQuestion from "../components/DragAndDrop";
import MatchingQuestion from "../components/Matching";
import MultipleChoiceQuestion from "../components/MultipleChoice";

export default function Lesson({ contentList }: { contentList: Content[] }) {
  const [pageNumber, setPageNumber] = useState(0);

  // returns the content as a React Component
  const renderPage = (page: Content) => {
    if (page.type === "intro") {
      return <Information page={page as Intro} />;
    } else if (page.type === "info") {
      return <Information page={page as Info} />;
    } else if (page.type === "dnd") {
      return <DragAndDropQuestion page={page as DragAndDrop} />;
    } else if (page.type === "matching") {
      return <MatchingQuestion page={page as Matching} />;
    } else if (page.type === "mc") {
      return <MultipleChoiceQuestion page={page as MultipleChoice} />;
    } else {
      return null;
    }
  };

  let renderedPage = renderPage(contentList[pageNumber]);

  return (
    <div className="container">
      <Header />
      <Body />
    </div>
  );

  function Header() {
    const onNextButtonPress = () => {
      if (pageNumber + 1 < contentList.length) {
        setPageNumber(pageNumber + 1);
      }
    };

    const onBackButtonPress = () => {
      if (pageNumber - 1 >= 0) {
        setPageNumber(pageNumber - 1);
      }
    };

    return (
      <div className="head">
        <div className=" left-head">
          <Link className="exit-link" to="/">
            <button className="exit-button">
              <LuX size={22} color={"#4369ee"} />
              <span>Exit</span>
            </button>
          </Link>
        </div>
        <div className="middle-head">
          <div className="progress-container">
            <div className="progress-stats">
              <div className="stat">
                <img src="/Lesson/heart.png" alt="heart" />
                <span>3</span>
              </div>
              <div className="page-count">
                {pageNumber + 1}/{contentList.length}
              </div>
              <div className="stat">
                <img src="/Lesson/streak.png" alt="streak" />
                <span>0</span>
              </div>
              <div></div>
            </div>
            <div className="progress-bar-container">
              <button onClick={onBackButtonPress}>
                <LuChevronLeft
                  className={pageNumber == 0 ? "inactive-icon" : "active-icon"}
                  size={28}
                />
              </button>
              <div className="progress-bar">
                <div className="progress-tracker"></div>
              </div>
              <button onClick={onNextButtonPress}>
                <LuChevronRight
                  className={
                    pageNumber + 1 == contentList.length
                      ? "inactive-icon"
                      : "active-icon"
                  }
                  size={28}
                />
              </button>
            </div>
          </div>
        </div>
        <div className="right-head">
          <button className="edit-button">
            <LuPenSquare size={23} />
            <span>Edit Lesson</span>
          </button>
        </div>
      </div>
    );
  }

  function Body() {
    const onNextButtonPress = () => {
      setTimeout(() => {
        if (pageNumber + 1 < contentList.length) {
          setPageNumber(pageNumber + 1);
        }
      }, 100);
    };

    return (
      <div className="body">
        <div className="left-body">
          <div className="chapters">
            <h1>Astronomy</h1>
            <div className="list-container">
              <ul>
                <li className="active">Intro</li>
                <li>The Sun</li>
                <li>Galaxies</li>
                <li>The Solar System</li>
                <li>Planets</li>
                <li>Stars</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="middle-body">
          <div className="main-display">{renderedPage}</div>
          <button className="next-button" onClick={onNextButtonPress}>
            <div className="inner-button">Let's Go!</div>
          </button>
        </div>
        <div className="right-body">
          <div className="ai-container">
            <div className="header">Need Help?</div>
            <div className="chat-bottom-border">
              <div className="chat-container">
                <div className="chat">
                  <LuBot size={30} />
                </div>
                <div className="chat-button-container">
                  <button>
                    <span>I want a Hint!</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
