import { Link } from "react-router-dom";
import "./Lesson.css";
import {
  LuBot,
  LuChevronLeft,
  LuChevronRight,
  LuPenSquare,
  LuX,
  LuMenu
} from "react-icons/lu";
import { useEffect, useState } from "react";
import Content from "../class/Content";
import Information from "../components/Information";
import DragAndDropQuestion from "../components/DragAndDrop";
import MatchingQuestion from "../components/Matching";
import MultipleChoiceQuestion from "../components/MultipleChoice";
import { motion, AnimatePresence } from "framer-motion";
import DragAndDrop from "../class/DragAndDrop";
import Info from "../class/Info";
import Intro from "../class/Intro";
import Matching from "../class/Matching";
import MultipleChoice from "../class/MultipleChoice";

export default function Lesson({ contentList }: { contentList: Content[] }) {
  const [pageNumber, setPageNumber] = useState(0);
  const [buttonText, setButtonText] = useState("Let's Go!");
  const [direction, setDirection] = useState("forward");
  const [sidebarOpen, setSidebarOpen] = useState(false);


  // Changes button text
  useEffect(() => {
    if (contentList[pageNumber].type === "intro") {
      setButtonText("Let's Go!");
    } else if (contentList[pageNumber].type === "info") {
      setButtonText("Next");
    } else {
      setButtonText("Check");
    }
  }, [pageNumber, contentList]);

  // returns the content as a React Component
  const renderPage = (page: Content) => {
    if (page.type === "intro") {
      return (
        <div className="main-container">
          <Information page={page as Intro} />
        </div>
      );
    } else if (page.type === "info") {
      return (
        <div className="main-container">
          <Information page={page as Info} />
        </div>
      );
    } else if (page.type === "dnd") {
      return (
        <div className="main-container">
          <DragAndDropQuestion page={page as DragAndDrop} />
        </div>
      );
    } else if (page.type === "matching") {
      return (
        <div className="main-container">
          <MatchingQuestion page={page as Matching} />
        </div>
      );
    } else if (page.type === "mc") {
      return (
        <div className="main-container">
          <MultipleChoiceQuestion page={page as MultipleChoice} />
        </div>
      );
    } else {
      return null;
    }
  };

  const renderedPage = renderPage(contentList[pageNumber]);

  // Main Page
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
          <ExitButton />
          <button className="burger" onClick={() => {setSidebarOpen(true)}}>
            <LuMenu size={28} />
          </button>
        </div>
        <div className="middle-head">
          <ProgressHeader />
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
        <Link className="exit-link" to="/">
          <button className="exit-button">
            <LuX size={22} color={"#4369ee"} />
            <span>Exit</span>
          </button>
        </Link>
      </div>
    );
  }

  function ProgressHeader() {
    return (
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
        <ProgressBar />
      </div>
    );
  }

  function ProgressBar() {
    const onNextButtonPress = () => {
      if (pageNumber + 1 < contentList.length) {
        setDirection("forward");
        setPageNumber(pageNumber + 1);
      }
    };

    const onBackButtonPress = async () => {
      if (pageNumber - 1 >= 0) {
        setDirection("backward");
        setPageNumber(pageNumber - 1);
      }
    };

    return (
      <div className="progress-bar-container">
        <button onClick={onBackButtonPress}>
          <LuChevronLeft
            className={pageNumber == 0 ? "inactive-icon" : "active-icon"}
            size={28}
          />
        </button>
        <div className="progress-bar">
          <AnimatePresence>
            <motion.div
              className="progress-tracker"
              initial={{
                width:
                  direction === "forward"
                    ? `${(pageNumber / contentList.length) * 100}%`
                    : `${((pageNumber + 2) / contentList.length) * 100}%`,
              }}
              animate={{
                width: `${((pageNumber + 1) / contentList.length) * 100}%`,
              }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>
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

  function Body() {
    return (
      <div className="body">
        <div className="left-body">
          <ChaptersNav />
        </div>
        <div className="middle-body">
          <MainDisplay />
        </div>
        <div className="right-body">
          <AIHelper />
        </div>
      </div>
    );
  }

  function ChaptersNav() {
    return (
      
      <div className={`sidebar ${sidebarOpen ? "active" : ""}`} id="mySidebar">
          <button className="close-button" onClick={() => setSidebarOpen(false)}>
            Close &times;
          </button>
      <div className="left-container">
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
      </div>
    );
  }

  function MainDisplay() {
    const onNextButtonPress = () => {
      setTimeout(() => {
        setDirection("forward");
        if (pageNumber + 1 < contentList.length) {
          setPageNumber(pageNumber + 1);
        }
      }, 150);
    };

    return (
      <>
        <div className="main-display">{renderedPage}</div>
        <motion.button
          layout
          transition={{ duration: 0.2 }}
          className="next-button"
          onClick={onNextButtonPress}
        >
          <div className="inner-button">{buttonText}</div>
        </motion.button>
      </>
    );
  }

  function AIHelper() {
    return (
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
    );
  }
}
