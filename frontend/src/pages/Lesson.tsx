import { Link } from "react-router-dom";
import "./Lesson.css";
import {
  LuBot,
  LuChevronLeft,
  LuChevronRight,
  LuPenSquare,
  LuX,
} from "react-icons/lu";
import { useEffect, useState } from "react";

export default function Lesson({ contentList }: { contentList: any[] }) {
  const [pageNumber, setPageNumber] = useState(0);
  let currentPage = contentList[pageNumber];

  useEffect(() => {
    currentPage = contentList[pageNumber];
  }, [pageNumber]);

  return (
    <div className="container">
      <Header />
      <Body />
    </div>
  );

  function Header() {
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
              <button>
                <LuChevronLeft className="inactive-icon" size={28} />
              </button>
              <div className="progress-bar">
                <div className="progress-tracker"></div>
              </div>
              <button>
                <LuChevronRight className="active-icon" size={28} />
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
      setPageNumber(pageNumber + 1);
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
          <div className="main-display"></div>
          <button className="next-button">
            <div className="inner-button">Let's Go!</div>
          </button>
        </div>
        <div className="right-body">
          <div className="ai-container">
            <div className="header">Need Help?</div>
            {/*I did this instead of setting a bottom border cuz i thought it looked better*/}
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
