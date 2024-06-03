import React from "react";
import "./Choices.css"; 

interface ChoiceProps {
  option: string;
  isCorrect: boolean;
  index: number;
  isSelected: boolean;
  showResult: boolean;
  onChoiceClick: () => void;
}

const Choice: React.FC<ChoiceProps> = ({
  option,
  isCorrect,
  index,
  isSelected,
  showResult,
  onChoiceClick
}) => {
  const letters = ["A", "B", "C", "D"];

  return (
    <div
      className={`choice-container ${isSelected ? (showResult ? (isCorrect ? "correct" : "incorrect") : "selected") : ""}`}
      onClick={onChoiceClick}
    >
      <div className="choice-label">{letters[index]}.</div>
      <div className="choice-box">
        <div className="choice-text">{option}</div>
      </div>
    </div>
  );
};

export default Choice;
