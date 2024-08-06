import { AnimatePresence } from "framer-motion";
import MultipleChoice from "../../class/MultipleChoice";
import { useLessonContext } from "../../context/LessonProvider";
import Choice from "./Choices/Choices";
import "./MultipleChoice.css";
import { useEffect, useState } from "react";
import Banner from "../misc/banner/Banner";
import * as React from "react";
import { requests } from "../../api/requestTemplate";
import { useAppSelector } from "../../redux/hooks";

// Multiple Choice question component
export default function MultipleChoiceQuestion(props: {
  page: MultipleChoice;
  id: any;
  setButtonText: (buttonText: string) => void;
  lives: number;
  streak: number;
  setLives: React.Dispatch<React.SetStateAction<number>>;
  setStreak: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);

  const question = props.page.question;

  const options = props.page.options;

  const optionKeys = Object.keys(options);

  const [localCheck, setLocalCheck] = useState(false);

  const token = useAppSelector((state) => state.auth.jwtToken);

  const {
    setCanProgress,
    bannerText,
    setBannerText,
    setIsQuestionPage,
    setCanCheckAnswers,
    canCheckAnswers,
    setCheckAnswer,
    checkAnswer,
    canProgress,
  } = useLessonContext();

  const [showBanner, setShowBanner] = useState(false);
  const [localCanCheckAnswers, setLocalCanCheckAnswers] = useState(false);

  useEffect(() => {
    setCanProgress(false);
    setIsQuestionPage(true);
    setCanCheckAnswers(false);
    setShowBanner(false);
    setCheckAnswer(false);
    props.setButtonText("Submit");
  }, []);

  const handleChoiceClick = (option: string) => {
    setSelectedChoice(option);
    setShowResult(false);
    setCanProgress(false);
  };

  useEffect(() => {
    if (selectedChoice === null) {
      setLocalCanCheckAnswers(false);
      setCanCheckAnswers(false);
    } else {
      setLocalCanCheckAnswers(true);
      setCanCheckAnswers(true);
    }
  }, [selectedChoice]);

  async function updateLesson(lives: number, streak: number) {
    await requests.patchRequest(token, `/lesson/${props.id}`, {
      lesson: { lives: lives, streakCount: streak },
    });
  }

  useEffect(() => {
    if (canCheckAnswers && localCanCheckAnswers) {
      setShowBanner(true);
      setTimeout(() => setShowBanner(false), 2500);
      if (!canProgress) {
        props.setStreak(0);
        props.setLives(props.lives - 1);
        updateLesson(props.lives - 1, 0);
      } else {
        props.setStreak(props.streak + 1);
        updateLesson(props.lives, props.streak + 1);
      }
    }
  }, [localCheck]);

  useEffect(() => {
    if (checkAnswer !== localCheck) {
      setLocalCheck(checkAnswer);

      let allCorrect = true;

      if (selectedChoice === null) {
        allCorrect = false;
      } else {
        allCorrect = options[selectedChoice];
      }

      if (allCorrect) {
        setBannerText("You got it!");
        props.setButtonText("Next");
      } else {
        setBannerText("Almost there.");
      }

      setShowResult(true);
      setCanProgress(allCorrect);
    }
  }, [checkAnswer, localCheck]);

  return (
    <div className="mc-container">
      <div className="mc-header">
        <span>{question}</span>
        <span>Select the best answer from the options below</span>
      </div>
      <div className="choices-grid">
        {optionKeys.map((option, index) => (
          <Choice
            key={index}
            option={option}
            isCorrect={options[option] ?? false}
            index={index}
            isSelected={selectedChoice === option}
            showResult={showResult}
            onChoiceClick={() => handleChoiceClick(option)}
          />
        ))}
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
  );
}
