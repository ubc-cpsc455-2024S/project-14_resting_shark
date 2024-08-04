import { LuGripVertical } from "react-icons/lu";
import "./Matching.css";
import { MouseEventHandler, useEffect, useMemo, useState } from "react";
import { AnimatePresence, Reorder } from "framer-motion";
import Matching from "../../class/Matching";
import { useLessonContext } from "../../context/LessonProvider";
import Line from "./lines/Line";
import Banner from "../misc/banner/Banner";
import * as React from "react";

interface Position {
  x: number;
  y: number;
}

export default function MatchingQuestion(props: {
  page: Matching;
  setButtonText: (buttonText: string) => void;
}) {
  const termsObject = props.page.terms;
  const definitionsObject = props.page.definitions;

  const terms = useMemo(() => Object.keys(termsObject), [termsObject]);
  const definitions = Object.keys(definitionsObject);

  const [reorderable, setReorderable] = useState(definitions);

  const [matchedPairs, setMatchedPairs] = useState<
    { start: string; end: string }[]
  >([]);
  const [currentTerm, setCurrentTerm] = useState("");
  const [isMatching, setIsMatching] = useState(false);
  const [isMatchTrue, setIsMatchTrue] = useState<{
    [x: string]: boolean | null;
  }>({});

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
    setLives,
    lives,
    streak,
    setStreak,
  } = useLessonContext();

  const [showBanner, setShowBanner] = useState(false);

  const [localCheck, setLocalCheck] = useState(false);
  const [localCanCheckAnswers, setLocalCanCheckAnswers] = useState(false);

  useEffect(() => {
    setCanProgress(false);
    setIsQuestionPage(true);
    setCanCheckAnswers(false);
    setShowBanner(false);
    setCheckAnswer(false);
    props.setButtonText("Submit");
  }, []);

  useEffect(() => {
    if (canCheckAnswers && localCanCheckAnswers) {
      setShowBanner(true);
      setTimeout(() => setShowBanner(false), 2500);
      if (!canProgress) {
        setStreak(0);
        setLives(lives - 1);
      } else {
        setStreak(streak + 1);
      }
    }
  }, [localCheck]);

  useEffect(() => {
    if (checkAnswer !== localCheck) {
      setLocalCheck(checkAnswer);

      let allCorrect = true;
      const newIsMatchedTrue = { ...isMatchTrue };

      matchedPairs.forEach((pair) => {
        if (termsObject[pair.start] !== definitionsObject[pair.end]) {
          allCorrect = false;
          newIsMatchedTrue[pair.start] = false;
          newIsMatchedTrue[pair.end] = false;
        } else {
          newIsMatchedTrue[pair.start] = true;
          newIsMatchedTrue[pair.end] = true;
        }
      });

      if (allCorrect) {
        setBannerText("Perfect!");
        props.setButtonText("Next");
      } else {
        setBannerText("So Close.");
      }

      setCanProgress(allCorrect);

      setIsMatchTrue(newIsMatchedTrue);
    }
  }, [checkAnswer, localCheck]);

  const [positions, setPositions] = useState<{ [key: string]: Position }>({});
  const [mousePosition, setMousePosition] = useState<Position>({ x: 0, y: 0 });

  useEffect(() => {
    const updatePositions = () => {
      const updatedPositions: { [key: string]: Position } = {};
      terms.forEach((term) => {
        const element = document.getElementById(term);
        if (element) {
          const rect = element.getBoundingClientRect();
          updatedPositions[term] = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          };
        }
      });
      reorderable.forEach((definition) => {
        const element = document.getElementById(definition);
        if (element) {
          const rect = element.getBoundingClientRect();
          updatedPositions[definition] = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          };
        }
      });
      setPositions(updatedPositions);
    };

    const interval = setInterval(() => {
      updatePositions();
    }, 1);

    updatePositions();

    return () => clearInterval(interval);
  }, [reorderable]);

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (event) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseLeave: MouseEventHandler<HTMLDivElement> = () => {
    setIsMatching(false);
    setMousePosition({ x: 0, y: 0 });
  };

  const onStartClick = (id: string) => {
    const newIsMatchedTrue = { ...isMatchTrue };
    newIsMatchedTrue[id] = null;
    setIsMatchTrue(newIsMatchedTrue);

    setCanProgress(false);
    props.setButtonText("Submit");

    if (!isMatching) {
      setCurrentTerm(id);
      setIsMatching(true);

      const filteredPairs = matchedPairs.filter((item) => item.start !== id);
      setMatchedPairs(filteredPairs);
    } else {
      setIsMatching(false);
    }
  };

  const onEndClick = (id: string) => {
    const newIsMatchedTrue = { ...isMatchTrue };
    newIsMatchedTrue[id] = null;
    setIsMatchTrue(newIsMatchedTrue);

    if (isMatching) {
      const filteredPairs = matchedPairs.filter((item) => item.end !== id);
      const newMatchedPairs = [
        ...filteredPairs,
        { start: currentTerm, end: id },
      ];
      setMatchedPairs(newMatchedPairs);
    }

    setIsMatching(false);
  };

  useEffect(() => {
    const matchedEnds = matchedPairs.map((pair) => pair.end);
    const matchedStarts = matchedPairs.map((pair) => pair.start);
    const newIsMatchedTrue = { ...isMatchTrue };

    definitions.forEach((item) => {
      const element = document.getElementById(item);
      if (!element) {
        return;
      }

      if (matchedEnds.includes(item)) {
        element.classList.add("selected-end");
      } else {
        element.classList.remove("selected-end");
        newIsMatchedTrue[item] = null;
      }
    });

    terms.forEach((item) => {
      if (!matchedStarts.includes(item)) {
        newIsMatchedTrue[item] = null;
      }
    });

    setIsMatchTrue(newIsMatchedTrue);

    if (matchedPairs.length === terms.length) {
      setCanCheckAnswers(true);
      setLocalCanCheckAnswers(true);
    } else {
      setCanCheckAnswers(false);
    }
  }, [matchedPairs]);

  return (
    <div
      className={`padded-container-3 ${isMatching ? "crosshair-cursor" : ""}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="header-matching">
        Match the terms with their definitions
      </div>
      <div className="matching-container">
        <div className="terms-container">
          {terms.map((term) => (
            <div
              className="term-container"
              key={term}
              onClick={() => onStartClick(term)}
            >
              {term}
              <span
                className={`connect-start ${
                  isMatchTrue[term] !== null && isMatchTrue[term]
                    ? "match-true"
                    : "match-null"
                } ${
                  isMatchTrue[term] !== null && !isMatchTrue[term]
                    ? "match-false"
                    : ""
                }`}
                id={term}
              ></span>
            </div>
          ))}
        </div>
        <Reorder.Group
          className="definitions-container"
          axis="y"
          values={reorderable}
          onReorder={setReorderable}
        >
          {reorderable.map((definition) => (
            <Reorder.Item
              value={definition}
              key={definition}
              className="definition-container"
              onClick={() => onEndClick(definition)}
            >
              {definition}
              <span
                className={`connect-end ${
                  isMatchTrue[definition] !== null && isMatchTrue[definition]
                    ? "match-true"
                    : ""
                } ${
                  isMatchTrue[definition] !== null && !isMatchTrue[definition]
                    ? "match-false"
                    : ""
                }`}
                id={definition}
              ></span>
              <span className="draggable-icon">
                <LuGripVertical size={22} />
              </span>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>
      {matchedPairs.map((item, index) => (
        <Line
          x1={positions[item.start]?.x ?? 0}
          y1={positions[item.start]?.y ?? 0}
          x2={positions[item.end]?.x ?? 0}
          y2={positions[item.end]?.y ?? 0}
          key={"line" + index}
          isCorrect={isMatchTrue[item.start]}
        />
      ))}
      {isMatching ? (
        <Line
          x1={positions[currentTerm]?.x ?? 0}
          y1={positions[currentTerm]?.y ?? 0}
          x2={mousePosition.x}
          y2={mousePosition.y}
          isCorrect={null}
        />
      ) : null}
      <div className="relative-container">
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
    </div>
  );
}
