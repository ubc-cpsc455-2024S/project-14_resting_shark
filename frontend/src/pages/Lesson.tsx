import { Link, useParams } from "react-router-dom";
import "./Lesson.css";
import {
  LuBot,
  LuChevronLeft,
  LuChevronRight,
  LuPenSquare,
  LuX,
} from "react-icons/lu";
import { useEffect, useState } from "react";
import Content from "../class/Content";
import DragAndDropQuestion from "../components/DragAndDrop/DragAndDrop";
import MatchingQuestion from "../components/Matching/Matching";
import MultipleChoiceQuestion from "../components/MultipleChoice/MultipleChoice";
import { motion, AnimatePresence } from "framer-motion";
import DragAndDrop from "../class/DragAndDrop";
import Info from "../class/Info";
import Intro from "../class/Intro";
import Matching from "../class/Matching";
import MultipleChoice from "../class/MultipleChoice";

import { useAppSelector, useAppDispatch } from "../redux/hooks";

import { setPageNumber, setButtonText } from "../redux/slices/lessonPageSlice";

import { lessonApi } from "../api/lessonApi";
import Information from "../components/Information/Information";
import { LessonProvider, useLessonContext } from "../context/LessonProvider";
import Modal from "../components/Modal/Modal";

export default function Lesson() {
  const { lessonId } = useParams();
  const contentList = useAppSelector((state) => state.fullLesson.contentList);
  const pageNumber = useAppSelector((state) => state.lessonPage.pageNumber);
  const direction = useAppSelector((state) => state.lessonPage.direction);
  const buttonText = useAppSelector((state) => state.lessonPage.buttonText);
  const [streakCount, setStreakCount] = useState(0);
  const [lives, setLives] = useState(3);
  const [showGameOver, setShowGameOver] = useState(false);
  // *check class/Content.ts if you want more info about the classes
  /* Syntax Break Down
  - Initial state value = Null
  - <number | null> = SelectedChoice can either be a number or null.
  */
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [modalBackgroundColor, setModalBackgroundColor] = useState<string>("");
  const [pendingUpdate, setPendingUpdate] = useState<boolean | null>(null); // Change to allow for null value

  const dispatch = useAppDispatch();

  // fetch lesson data
  useEffect(() => {
    dispatch(
      lessonApi.fetchFullLesson({
        token: "exampleJWTtoken",
        lessonId: lessonId,
      })
    );
  }, [lessonId, dispatch]);

  // Changes button text
  useEffect(() => {
    if (contentList.length === 0) {
      // if content list is still loading, do not set button
      return;
    } else if (contentList[pageNumber].type === "intro") {
      dispatch(setButtonText("Let's Go!"));
    } else if (contentList[pageNumber].type === "info") {
      dispatch(setButtonText("Next"));
    } else {
      dispatch(setButtonText("Check"));
    }
  }, [pageNumber, contentList, dispatch]);

  // Updates the streak count when user answers correctly.
  const updateStreak = (isCorrect: boolean) => {
    setStreakCount(isCorrect ? streakCount + 1 : 0);
  };
  // Decrease the lives count when user answers incorrectly.
  const updateLives = (decrease: boolean) => {
    if (decrease) {
      setLives((prevLives) => {
        const newLives = prevLives - 1;
        if (newLives <= 0) {
          setShowGameOver(true);
        }
        return newLives;
      });
    }
  };
  // Closes the GameOver Modal that pops up when your life goes to 0
  const closeGameOverModal = () => {
    setShowGameOver(false);
    setLives(3); // Reset lives or any other action on game over
    setStreakCount(0); // Reset streak or any other action on game over
  };

  // returns the content as a React Component
  const renderPage = (page: Content) => {
    if (!page) {
      // return an empty loading page when waiting for backend to return data
      return <div>Loading...</div>;
    } else if (page.type === "intro") {
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
          <MultipleChoiceQuestion
            page={page as MultipleChoice}
            onOptionSelect={setSelectedChoice}
            selectedOption={selectedChoice}
            showResult={showResult}
            modalMessage={modalMessage}
            modalBackgroundColor={modalBackgroundColor}
            closeModal={closeGameOverModal}
          />
        </div>
      );
    } else {
      return null;
    }
  };

  const renderedPage = renderPage(contentList[pageNumber]);

  // Main Page
  return (
    <LessonProvider>
      <div className="container">
        <Header />
        <Body />
      </div>
    </LessonProvider>
  );

  function Header() {
    return (
      <div className="head">
        <div className=" left-head">
          <ExitButton />
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
            <span>{lives}</span>
          </div>
          <div className="page-count">
            {pageNumber + 1}/{contentList.length}
          </div>
          <div className="stat">
            <img src="/Lesson/streak.png" alt="streak" />
            <span>{streakCount}</span>
          </div>
          <div></div>
        </div>
        <ProgressBar />
        <Modal
          show={showGameOver}
          message="Game Over"
          backgroundColor="#FF0000"
          onClose={closeGameOverModal}
        />
      </div>
    );
  }

  function ProgressBar() {
    const onNextButtonPress = () => {
      if (pageNumber + 1 < contentList.length) {
        dispatch(setPageNumber(pageNumber + 1));
      }
    };

    const onBackButtonPress = async () => {
      if (pageNumber - 1 >= 0) {
        dispatch(setPageNumber(pageNumber - 1));
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
    );
  }

  function MainDisplay() {
    const {
      farthestPage,
      isQuestionPage,
      setFarthestPage,
    } = useLessonContext();

    const onNextButtonPress = () => {
      if (isQuestionPage) {
        const currentPage = contentList[pageNumber];

        switch (currentPage.type) {
          case "mc":
            handleMultipleChoiceSubmit(currentPage as MultipleChoice);
            break;
          case "dnd":
            handleDragAndDropSubmit(currentPage as DragAndDrop);
            break;
          case "matching":
            handleMatchingSubmit(currentPage as Matching);
            break;
          default:
            proceedToNextPage();
            break;
        }
      } else {
        proceedToNextPage();
      }
    };

    /* ChatGPT 3.5 assisted in generating this method on May 31st, 2024.
    The prompt I provided was: "I want the Choice Component to turn blue when selected and the submit button to reveal if the answer is correct."
    It generated a helper method template to manage the state for the selected choice and the result.
    Using this as a reference, I manually edited state names to match our case. */
    const handleMultipleChoiceSubmit = (page: MultipleChoice) => {
      const options = page.options;
      const optionKeys = Object.keys(options);

      if (selectedChoice !== null) {
        const selectedOption = optionKeys[selectedChoice];
        const isCorrect = options[selectedOption] ?? false;
        setShowResult(true);
        updateStreak(isCorrect);
        if (!isCorrect) {
          updateLives(true);
        }
        setModalMessage(isCorrect ? "Great job!" : "Good try!");
        setModalBackgroundColor(isCorrect ? "#29CC60" : "#FF278A");
      } else {
        alert("Please select an option");
      }
    };

    const handleDragAndDropSubmit = (page: DragAndDrop) => {
      // Add your drag and drop submit logic here
      // Example:
      const isCorrect = false; // checkDragAndDropAnswer(page);
      if (isCorrect) {
        alert("Drag and Drop Correct");
      } else {
        alert("Drag and Drop Incorrect");
      }
    };

    const handleMatchingSubmit = (page: Matching) => {
      // Add your matching submit logic here
      // Example:
      const isCorrect = false; // checkMatchingAnswer(page);
      if (isCorrect) {
        alert("Matching Correct");
      } else {
        alert("Matching Incorrect");
      }
    };

    const proceedToNextPage = () => {
      if (pageNumber + 1 < contentList.length) {
        setPageNumber(pageNumber + 1);
        if (pageNumber + 1 > farthestPage) {
          setFarthestPage(pageNumber + 1);
        }
      }
    };

    const closeModal = () => {
      if (pendingUpdate !== null) {
        updateStreak(pendingUpdate);
        if (!pendingUpdate) {
          updateLives(true); // Decrease lives by 1 if the answer was incorrect
        }
      }
      setModalMessage("");
      setShowResult(false);
      setSelectedChoice(null); // Reset selected choice
      setPendingUpdate(null); // Reset pending update flag
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
        <Modal
          show={modalMessage !== ""}
          message={modalMessage}
          backgroundColor={modalBackgroundColor}
          onClose={closeModal}
        />
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
