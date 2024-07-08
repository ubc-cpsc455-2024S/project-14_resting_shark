import { useEffect, useState } from "react";
import MultipleChoice from "../../class/MultipleChoice";
import Choice from "../Choices/Choices";
import Modal from "../Modal/Modal";
import "./MultipleChoice.css";
import { useLessonContext } from "../../context/LessonProvider";
import { useNavigate } from "react-router-dom";

export default function MultipleChoiceQuestion({
  page,
  setButtonText,
  updateStreak,
  updateLives,
  lives,
}: {
  page: MultipleChoice;
  setButtonText: (buttonText: string) => void;
  updateStreak: (isCorrect: boolean) => void;
  updateLives: (decrease: boolean) => void;
  lives: number;
}) {
  const question = page.question;
  // a Map<string, boolean> with choices as the key; the correct answer will have a true value and wrong ones will have a false value
  const options = page.options;
  // just the string choices as an array (with no boolean value that represents correctness)
  const optionKeys = Object.keys(options);
  // *check class/Content.ts if you want more info about the classes
  /* Syntax Break Down
  - Initial state value = Null
  - <number | null> = SelectedChoice can either be a number or null.
  */
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isCorrectList, setIsCorrectList] = useState<{ [key: string]: boolean | null }>({});
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [localCheck, setLocalCheck] = useState<boolean>(false);

  const {
    setCanProgress,
    bannerText,
    setBannerText,
    canProgress,
    setIsQuestionPage,
    setCanCheckAnswers,
    checkAnswer,
    setCheckAnswer,
  } = useLessonContext();

  const navigate = useNavigate();

  useEffect(() => {
    setCanProgress(false);
    setIsQuestionPage(true);
    setCanCheckAnswers(false);
    setCheckAnswer(false);
    setButtonText("Submit");
  }, []);

  /* ChatGPT 3.5 assisted in generating this method on May 31st, 2024.
  The prompt I provided was: "I want the Choice Component to turn blue when selected and the submit button to reveal if the answer is correct."
  It generated a helper method template to manage the state for the selected choice and the result.
  Using this as a reference, I manually edited state names to match our case. */
  useEffect(() => {
    if (checkAnswer !== localCheck) {
      setLocalCheck(checkAnswer);

      let allCorrect = true;
      const newCorrectList = { ...isCorrectList };

      if (selectedChoice !== null) {
        const selectedOption = optionKeys[selectedChoice];
        const isCorrect = options[selectedOption];

        newCorrectList[selectedOption] = isCorrect;

        if (!isCorrect) {
          allCorrect = false;
          updateLives(true);

          if (lives - 1 <= 0) {
            setBannerText("Game Over");
            setButtonText("Close");
            setGameOver(true);
          } else {
            setBannerText("Try Again!");
          }
        } else {
          setBannerText("Correct!");
          updateStreak(true);
        }
      } else {
        allCorrect = false;
      }

      setIsCorrectList(newCorrectList);
      setCanProgress(allCorrect);
      setShowResult(true);
    }
  }, [checkAnswer, localCheck]);

  const handleChoiceClick = (index: number) => {
    setSelectedChoice(index);
    setCanCheckAnswers(true);
  };

  const closeModal = () => {
    setShowResult(false);
    if (gameOver) {
      navigate("/dashboard");
    }
    // TODO: Implement logic to navigate to next question if it exists.
    // In the mock data, this is the last question.
    if (canProgress) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="mc-container">
      <h1>{question}</h1>
      <div className="choices-grid">
        {optionKeys.map((option, index) => (
          <Choice
            key={index}
            option={option}
            isCorrect={options[option] ?? false}
            index={index}
            isSelected={selectedChoice === index}
            showResult={showResult}
            onChoiceClick={() => handleChoiceClick(index)}
          />
        ))}
      </div>
      <Modal
        show={showResult}
        message={bannerText}
        backgroundColor={canProgress ? "green" : lives <= 0 ? "red" : "#FF278A"}
        onClose={closeModal}
      />
    </div>
  );
}
