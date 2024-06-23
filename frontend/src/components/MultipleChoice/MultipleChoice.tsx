import MultipleChoice from "../../class/MultipleChoice";
import Choice from "../Choices/Choices";
import "./MultipleChoice.css"; // PUT YOUR CSS IN THIS FILE

export default function MultipleChoiceQuestion({
  page,
  onOptionSelect,
  selectedOption,
  showResult,
}: {
  page: MultipleChoice;
  onOptionSelect: (index: number) => void;
  selectedOption: number | null;
  showResult: boolean;
  modalMessage: string;
  modalBackgroundColor: string;
  closeModal: () => void;
}) {
  // a string
  const question = page.question;
  
  // a Map<string, boolean> with choices as the key; the correct answer will have a true value and wrong ones will have a false value
  const options = page.options;
  // just the string choices as an array (with no boolean value that represents correctness)
  const optionKeys = Object.keys(options);

  const handleChoiceClick = (index: number) => {
    onOptionSelect(index);
  };

  // I put all the content that you need onto the screen for you
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
            isSelected={selectedOption === index}
            showResult={showResult}
            onChoiceClick={() => handleChoiceClick(index)}
          />
        ))}
      </div>
    </div>
  );
}

