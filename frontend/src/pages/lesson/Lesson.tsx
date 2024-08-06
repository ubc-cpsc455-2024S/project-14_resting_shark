import { useParams } from "react-router-dom";
import "./Lesson.css";
import { useEffect, useState } from "react";
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
import { setButtonText } from "../../redux/slices/lessonPageSlice";
import { lessonApi } from "../../api/lessonApi";
import Information from "../../components/Information/Information";
import { LessonProvider } from "../../context/LessonProvider";
import Header from "./header/Header";
import Body from "./body/Body";
import * as React from "react";
import FinishedLesson from "../FinishedLesson/FinishedLesson";
import { requests } from "../../api/requestTemplate";

function Lesson() {
  const { lessonId } = useParams();
  const token = useAppSelector((state) => state.auth.jwtToken);
  const contentList = useAppSelector((state) => state.fullLesson.contentList);
  const direction = useAppSelector((state) => state.lessonPage.direction);
  const buttonText = useAppSelector((state) => state.lessonPage.buttonText);
  const fullLesson = useAppSelector((state) => state.fullLesson);

  const [lives, setLives] = useState(3);
  const [streak, setStreak] = useState(0);
  const [chapters, setChapters] = useState({});
  const [pageNumber, setPageNumber] = useState(0);
  const [startPage, setStartPage] = useState(0);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (contentList.length != 0 && fullLesson) {
      const secondChapter = contentList[1] as Info;
      const currChapter = {
        title: fullLesson.lesson?.name,
        chapters: [
          "Intro",
          secondChapter.title,
          ...contentList
            .slice(-3)
            .map((_: any, index: number) => "Question " + (index + 1)),
        ],
      };

      setChapters(currChapter);
    }
  }, [contentList, fullLesson]);

  async function updateLesson() {
    let updatedLesson = await requests.getRequest(token, `/lesson/${lessonId}`);
    console.log("fetched lesson", updatedLesson);

    if (startPage <= pageNumber && updatedLesson) {
      updatedLesson.pageProgress = pageNumber;
    } else if (updatedLesson.pageProgress > contentList.length - 1) {
      updatedLesson.pageProgress = contentList.length - 1;
      console.log(updatedLesson);
    }

    if (updatedLesson !== null && updatedLesson !== undefined) {
      try {
        await requests.patchRequest(token, `/lesson/${lessonId}`, {
          lesson: { ...updatedLesson },
        });
      } catch (error) {
        console.error("Failed to update lesson:", error);
      }
    } else {
      console.log("lesson null");
    }
  }

  useEffect(() => {
    return () => {
      updateLesson();
    };
  }, [pageNumber]);

  useEffect(() => {
    async function fetchLesson() {
      try {
        const resultAction = await dispatch(
          lessonApi.fetchFullLesson({ token, lessonId })
        );
        if (lessonApi.fetchFullLesson.fulfilled.match(resultAction)) {
          setLives(resultAction.payload.lives);
          setStreak(resultAction.payload.streakCount);
          if (resultAction.payload.pageProgress === -1) {
            setPageNumber(0);
          } else {
            setPageNumber(resultAction.payload.pageProgress);
          }
          setStartPage(resultAction.payload.pageProgress);
        } else {
          console.error("Failed to fetch lesson:", resultAction.error);
        }
      } catch (error) {
        console.error("Error in fetchLesson:", error);
      }
    }
    if (lessonId) {
      fetchLesson();
    }
  }, [lessonId, dispatch, token]);

  useEffect(() => {
    try {
      if (contentList.length === 0) {
        return;
      } else if (contentList[pageNumber].type === "intro") {
        dispatch(setButtonText("Let's Go!"));
      } else if (contentList[pageNumber].type === "info") {
        dispatch(setButtonText("Next"));
      } else {
        dispatch(setButtonText("Submit"));
      }
    } catch (e: any) {
      setPageNumber(0);
    }
  }, [pageNumber, contentList, dispatch]);

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
          <DragAndDropQuestion
            setButtonText={(buttonText: string) =>
              dispatch(setButtonText(buttonText))
            }
            page={page as DragAndDrop}
            id={lessonId}
            lives={lives}
            setLives={setLives}
            streak={streak}
            setStreak={setStreak}
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
            id={lessonId}
            lives={lives}
            setLives={setLives}
            streak={streak}
            setStreak={setStreak}
          />
        </div>
      );
    } else if (page.type === "mc") {
      return (
        <div className="main-container">
          <MultipleChoiceQuestion
            page={page as MultipleChoice}
            setButtonText={(buttonText: string) =>
              dispatch(setButtonText(buttonText))
            }
            id={lessonId}
            lives={lives}
            setLives={setLives}
            streak={streak}
            setStreak={setStreak}
          />
        </div>
      );
    } else if (page.type === "finished") {
      return (
        <div className="main-container">
          <FinishedLesson />
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
          pageNumber={pageNumber}
          contentList={contentList}
          direction={direction}
          setPageNumber={(pageNumber: number) => setPageNumber(pageNumber)}
          lives={lives}
          streak={streak}
        />
        <Body
          pageNumber={pageNumber}
          contentList={contentList}
          setPageNumber={(pageNumber: number) => setPageNumber(pageNumber)}
          setButtonText={(buttonText: string) =>
            dispatch(setButtonText(buttonText))
          }
          renderedPage={renderedPage}
          buttonText={buttonText}
          chapters={chapters}
          lives={lives}
          streak={streak}
        />
      </div>
    </LessonProvider>
  );
}

export default Lesson;
