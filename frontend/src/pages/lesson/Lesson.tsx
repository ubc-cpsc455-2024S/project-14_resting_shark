import { useParams } from "react-router-dom";
import "./Lesson.css";
import { useEffect, useState, useCallback } from "react";
import Content from "../../class/Content";
import DragAndDropQuestion from "../../components/DragAndDrop/DragAndDrop";
import MatchingQuestion from "../../components/Matching/Matching";
import MultipleChoiceQuestion from "../../components/MultipleChoice/MultipleChoice";
import DragAndDrop from "../../class/DragAndDrop";
import Info from "../../class/Info";
import Intro from "../../class/Intro";
import Matching from "../../class/Matching";
import MultipleChoice from "../../class/MultipleChoice";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { setPageNumber, setButtonText } from "../../redux/slices/lessonPageSlice";
import { lessonApi } from "../../api/lessonApi";
import Information from "../../components/Information/Information";
import { LessonProvider } from "../../context/LessonProvider";
import Header from "./header/Header";
import Body from "./body/Body";
import { useNavigate } from "react-router-dom";

function Lesson() {
  const { lessonId } = useParams();
  const contentList = useAppSelector((state) => state.fullLesson.contentList);
  const pageNumber = useAppSelector((state) => state.lessonPage.pageNumber);
  const direction = useAppSelector((state) => state.lessonPage.direction);
  const buttonText = useAppSelector((state) => state.lessonPage.buttonText);
  const [streakCount, setStreakCount] = useState(0);
  const [lives, setLives] = useState(3);
  const [navigateToDashboard, setNavigateToDashboard] = useState(false);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  // Fetch lesson data
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
      // If content list is still loading, do not set button
      return;
    } else if (contentList[pageNumber].type === "intro") {
      dispatch(setButtonText("Let's Go!"));
    } else if (contentList[pageNumber].type === "info") {
      dispatch(setButtonText("Next"));
    } else if (navigateToDashboard) {
      // TODO: Implement logic to navigate to dashboard when the button is pressed 
      // Currently it navigates to the dashboard when the modal closes (in MC Questions)
      navigate("/dashboard");
    } else {
      dispatch(setButtonText("Submit"));
    } 
  }, [pageNumber, contentList, navigate, navigateToDashboard, dispatch]);

  // Updates the streak count when user answers correctly.
  const updateStreak = useCallback((isCorrect: boolean) => {
    setStreakCount((prevStreak) => (isCorrect ? prevStreak + 1 : 0));
  }, []);

  // Decrease the lives count when user answers incorrectly.
  const updateLives = useCallback((decrease: boolean) => {
    if (decrease) {
      setLives((prevLives) => {
        const newLives = prevLives - 1;
        return newLives;
      });
    }
  }, []);

  // Returns the content as a React Component
  const renderPage = (page: Content) => {
    if (!page) {
      // Return an empty loading page when waiting for backend to return data
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
          <DragAndDropQuestion
            setButtonText={(buttonText: string) =>
              dispatch(setButtonText(buttonText))
            }
            page={page as DragAndDrop}
          />
        </div>
      );
    } else if (page.type === "matching") {
      return (
        <div className="main-container">
          <MatchingQuestion
            setButtonText={(buttonText: string) =>
              dispatch(setButtonText(buttonText))
            }
            page={page as Matching}
          />
        </div>
      );
    } else if (page.type === "mc") {
      return (
        <div className="main-container">
          <MultipleChoiceQuestion
            setButtonText={(buttonText: string) =>
              dispatch(setButtonText(buttonText))
            }
            page={page as MultipleChoice}
            updateStreak={updateStreak}
            updateLives={updateLives}
            lives={lives}
            setNavigateToDashboard={setNavigateToDashboard}
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
        <Header
          lives={lives}
          pageNumber={pageNumber}
          streakCount={streakCount}
          contentList={contentList}
          direction={direction}
          setPageNumber={(pageNumber: number) =>
            dispatch(setPageNumber(pageNumber))
          }
        />
        <Body
          pageNumber={pageNumber}
          contentList={contentList}
          setPageNumber={(pageNumber: number) =>
            dispatch(setPageNumber(pageNumber))
          }
          setButtonText={(buttonText: string) =>
            dispatch(setButtonText(buttonText))
          }
          renderedPage={renderedPage}
          buttonText={buttonText}
        />
      </div>
    </LessonProvider>
  );
}

export default Lesson;
