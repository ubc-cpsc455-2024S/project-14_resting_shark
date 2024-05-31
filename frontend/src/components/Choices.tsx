import React, { useState } from "react";
import "./MultipleChoice.css"; 

interface ChoiceProps {
  option: string;
  isCorrect: boolean;
  index: number;
}

const Choice: React.FC<ChoiceProps> = ({ option, isCorrect, index }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
  };

  // Static array for each choice ("Assuming that there is only four options for each MC questions")
  const letters = ["A", "B", "C", "D"];

  return (
    <div
      className={`choice ${clicked ? (isCorrect ? "correct" : "incorrect") : ""}`}
      onClick={handleClick}
    >
      <div className="choice-label">{letters[index]}.</div>
      <div className="choice-text">{option}</div>
    </div>
  );
};

export default Choice;