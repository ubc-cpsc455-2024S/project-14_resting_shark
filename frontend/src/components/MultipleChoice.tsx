import { MultipleChoice } from "../class/Content";
import Choice from "./Choices"; // Import the Choice component
import "./MultipleChoice.css"; // PUT YOUR CSS IN THIS FILE

// Multiple Choice question component
export default function MultipleChoiceQuestion({
  page,
}: {
  page: MultipleChoice;
}) {
  // *check class/Content.ts if you want more info about the classes

  // a string
  const question = page.question;

  console.log(question);

  // a Map<string, boolean> with choices as the key; the correct answer will have a true value and wrong ones will have a false value
  const options = page.options;

  // just the string choices as an array (with no boolean value that represents correctness)
  const optionKeys = Array.from(options.keys());

  // I put all the content that you need onto the screen for you
  return (
    <div className="container">
      <h1>{question}</h1>
      <div className="choices-grid">
        {optionKeys.map((option, index) => (
          <Choice key={index} option={option} isCorrect={options.get(option) ?? false} index={index} />
        ))}
      </div>
    </div>
  );
}

// lmk if you have any questions
