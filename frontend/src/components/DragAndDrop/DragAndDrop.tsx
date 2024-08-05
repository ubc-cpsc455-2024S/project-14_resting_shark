import { useEffect, useRef, useState } from "react";
import "./DragAndDrop.css";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import DragAndDrop from "../../class/DragAndDrop";
import { useLessonContext } from "../../context/LessonProvider";
import Banner from "../misc/banner/Banner";
import { AnimatePresence } from "framer-motion";
import * as React from "react";

function DragAndDropQuestion(props: {
  page: DragAndDrop;
  setButtonText: (buttonText: string) => void;
  buttonText: string
}) {
  const content = props.page.content;
  const draggableObject = props.page.draggable;
  const [parents, setParents] = useState<{ [key: string]: string | null }>({});

  const draggableKeys = Object.keys(draggableObject);

  const [showBanner, setShowBanner] = useState(false);

  const {
    setCanProgress,
    bannerText,
    setBannerText,
    canProgress,
    setIsQuestionPage,
    setCanCheckAnswers,
    checkAnswer,
    canCheckAnswers,
    setCheckAnswer,
    lives,
    streak,
    setLives,
    setStreak,
  } = useLessonContext();

  useEffect(() => {
    setCanProgress(false);
    setIsQuestionPage(true);
    setCanCheckAnswers(false);
    initializeParents();
    setShowBanner(false);
    setCheckAnswer(false);
    props.setButtonText("Submit");
    setLives(lives);
    setStreak(streak);
  }, []);

  const [isCorrectList, setIsCorrectList] = useState<{
    [key: string]: boolean | null;
  }>({});

  const [localCheck, setLocalCheck] = useState(false);
  const [localCanCheckAnswers, setLocalCanCheckAnswers] = useState(false);

  useEffect(() => {
    if (canCheckAnswers && localCanCheckAnswers) {
      setShowBanner(true);
      setTimeout(() => setShowBanner(false), 2500);
    }
  }, [localCheck]);

  useEffect(() => {
    if (checkAnswer !== localCheck && props.buttonText == "Submit") {
      setLocalCheck(checkAnswer);

      let allCorrect = true;
      const newCorrectList = { ...isCorrectList };

      for (let i = 0; i < content.length; i++) {
        if (typeof content[i] !== "string") {
          const blankId = content[i];
          const currentDraggable = parents[blankId];
          if (currentDraggable) {
            const correctId = draggableObject[currentDraggable];
            if (correctId !== blankId) {
              allCorrect = false;
              newCorrectList[blankId] = false;
            } else {
              newCorrectList[blankId] = true;
            }
          } else {
            allCorrect = false;
          }
        }
      }

      if (allCorrect) {
        setBannerText("Amazing!");
        props.setButtonText("Next");
        setStreak(streak + 1);
      } else {
        setBannerText("Try Again!");
        setLives(lives - 1);
        setStreak(0);
      }

      setIsCorrectList(newCorrectList);
      setCanProgress(allCorrect);
    }
  }, [checkAnswer, localCheck]);

  return (
    <div className="outer-container">
      <DndContext onDragEnd={handleDragEnd}>
        <div className="padded-container">
          <div>Drag and Drop to complete the sentence.</div>
          <div className="blank-container-container">
            <p className="blank-container">
              {content.map((option, index) => {
                if (typeof option === "string") {
                  const id = `string-${index}`;
                  return <span key={id}>{option}</span>;
                } else {
                  return (
                    <Droppable key={option} id={option} parents={parents}>
                      {parents[option] ? (
                        <Draggable
                          isCorrect={isCorrectList[option]}
                          dropped={true}
                          id={parents[option]}
                        >
                          <b>{parents[option]}</b>
                        </Draggable>
                      ) : (
                        ""
                      )}
                    </Droppable>
                  );
                }
              })}
            </p>
          </div>
          <AnimatePresence>
            {showBanner ? (
              <Banner
                isCorrect={canProgress}
                message={bannerText}
                gameOver={false}
              />
            ) : null}
          </AnimatePresence>
        </div>
        <div className="options-container">
          {draggableKeys.map((option) => (
            <DraggableContainer key={option} option={option} parents={parents}>
              <Draggable id={option} dropped={false} isCorrect={null}>
                <b>{option}</b>
              </Draggable>
            </DraggableContainer>
          ))}
        </div>
      </DndContext>
    </div>
  );

  function handleDragEnd(event: { active: any; over: any }) {
    const { active, over } = event;

    setCanProgress(false);
    props.setButtonText("Submit");

    if (over) {
      setParents((prevParents) => {
        const newParents = { ...prevParents };

        for (const key in newParents) {
          if (newParents[key] === active.id) {
            newParents[key] = null;
          }
        }

        newParents[over.id] = active.id;

        checkAllDroppablesFilled(newParents);

        return newParents;
      });

      setIsCorrectList((prevIsCorrectList) => {
        const newIsCorrectList = { ...prevIsCorrectList };
        newIsCorrectList[over.id] = null;
        return newIsCorrectList;
      });
    } else {
      setParents((prevParents) => {
        const newParents = { ...prevParents };

        for (const key in newParents) {
          if (newParents[key] === active.id) {
            newParents[key] = null;
          }
        }

        checkAllDroppablesFilled(newParents);

        return newParents;
      });
    }
  }

  function checkAllDroppablesFilled(parents: { [key: string]: string | null }) {
    const allFilled = content.every((item) => {
      if (typeof item !== "string") {
        return parents[item] !== null;
      }
      return true;
    });
    setCanCheckAnswers(allFilled);
    setLocalCanCheckAnswers(allFilled);
  }

  function initializeParents() {
    const initialParents: { [key: string]: string | null } = {};
    content.forEach((item) => {
      if (typeof item !== "string") {
        initialParents[item as unknown as string] = null;
      }
    });
    setParents(initialParents);
  }
}

function Droppable(props: {
  id: any;
  children: any;
  parents: { [key: string]: string | null };
}) {
  const [containsDraggable, setContainsDraggable] = useState(false);

  const { setNodeRef, isOver } = useDroppable({
    id: props.id,
  });

  useEffect(() => {
    if (!props.parents[props.id]) {
      setContainsDraggable(false);
    } else {
      setContainsDraggable(true);
    }
  }, [props.parents]);

  return (
    <span
      ref={setNodeRef}
      className={`${isOver ? "droppable-over" : ""} droppable`}
      style={containsDraggable ? { minWidth: "0px" } : { minWidth: "5.2rem" }}
    >
      {props.children}
    </span>
  );
}

function Draggable(props: {
  id: any;
  children: any;
  dropped: boolean;
  isCorrect: boolean | null;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
    cursor: "grab",
    ...(props.isCorrect != null &&
      !props.isCorrect && {
        border: "3px solid #FF278A",
      }),
    ...(props.isCorrect != null &&
      props.isCorrect && {
        border: "3px solid #29CC60",
      }),
  };

  return (
    <button
      className={props.dropped ? "draggable" : "draggable not-dropped"}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {props.children}
    </button>
  );
}

function DraggableContainer({
  option,
  parents,
  children,
}: {
  option: string;
  parents: { [key: string]: string | null };
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | null>(null);

  // + 0.1 since the padding makes multiple words become two lines without
  useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.offsetWidth + 0.1);
    }
  }, [ref, parents]);

  return (
    <div
      ref={ref}
      className="draggable-container"
      style={{ width: width ? `${width}px` : "auto" }}
    >
      {!Object.values(parents).includes(option) && children}
    </div>
  );
}

export default DragAndDropQuestion;
