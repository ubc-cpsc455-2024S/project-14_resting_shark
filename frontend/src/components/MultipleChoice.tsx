import { MultipleChoice } from "../class/Content";
import { motion } from "framer-motion";
import Choice from "./Choices";
import Modal from "./Modal"; // Import the Modal component
import "./MultipleChoice.css"; // PUT YOUR CSS IN THIS FILE
import { useState } from "react";

// Multiple Choice question component
export default function MultipleChoiceQuestion({
  page,
}: {
  page: MultipleChoice;
}) {
  // *check class/Content.ts if you want more info about the classes
  /* Syntax Break Down
  - Initial state value = Null 
  - <number | null> = SelectedChoice can either be a number or null.
  */
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [modalBackgroundColor, setModalBackgroundColor] = useState<string>("");

  // a string
  const question = page.question;

  // a Map<string, boolean> with choices as the key; the correct answer will have a true value and wrong ones will have a false value
  const options = page.options;

  // just the string choices as an array (with no boolean value that represents correctness)
  const optionKeys = Array.from(options.keys());

  const handleChoiceClick = (index: number) => {
    setSelectedChoice(index);
    setShowResult(false); // Reset result when a new choice is selected
    setModalMessage(""); // Reset modal message
  };

  /* ChatGPT 3.5 assisted in generating this method on May 31st, 2024.
  The prompt I provided was: "I want the Choice Component to turn blue when selected and the submit button to reveal if the answer is correct."
  It generated a helper method template to manage the state for the selected choice and the result.
  Using this as a reference, I manually edited state names to match our case. */
  const handleNextButtonPress = () => {
    if (selectedChoice !== null) {
      const selectedOption = optionKeys[selectedChoice];
      const isCorrect = options.get(selectedOption) ?? false;
      setShowResult(true);
      if (isCorrect) {
        setModalMessage("Great job!");
        setModalBackgroundColor("#29CC60");
      } else {
        setModalMessage("Good try!");
        setModalBackgroundColor("#FF278A");
      }
    }
  };

  const closeModal = () => {
    setModalMessage("");
  };

  // I put all the content that you need onto the screen for you
  return (
    <div className="container">
      <h1>{question}</h1>
      <div className="choices-grid">
        {optionKeys.map((option, index) => (
          <Choice
            key={index}
            option={option}
            isCorrect={options.get(option) ?? false}
            index={index}
            isSelected={selectedChoice === index}
            showResult={showResult}
            onChoiceClick={() => handleChoiceClick(index)}
          />
        ))}
      </div>
      <motion.button
        layout
        transition={{ duration: 0.2 }}
        className="next-button"
        onClick={handleNextButtonPress}
      >
        <div className="inner-button">Next</div>
      </motion.button>
      <Modal
        show={modalMessage !== ""}
        message={modalMessage}
        backgroundColor={modalBackgroundColor}
        onClose={closeModal}
      />
    </div>
  );
}

// lmk if you have any questions
