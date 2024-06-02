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

const Choice: React.FC<ChoiceProps> = ({ option, isCorrect, index, isSelected, showResult, onChoiceClick }) => {
  // Static array for each choice ("Assuming that there is only four options for each MC questions")
  const letters = ["A", "B", "C", "D"];

  let className = "choice";
  if (isSelected) {
    className += " selected"; // Blue when selected
    if (showResult) {
      className += isCorrect ? " correct" : " incorrect"; // Green or red based on correctness
    }
  }

  return (
    <div className={className} onClick={onChoiceClick}>
      <div className="choice-label">{letters[index]}.</div>
      <div className="choice-text">{option}</div>
    </div>
  );
};

export default Choice;
