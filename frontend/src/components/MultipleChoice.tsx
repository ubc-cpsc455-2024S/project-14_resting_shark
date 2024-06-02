import { MultipleChoice } from "../class/Content";
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

  // an object with choices as the key; the correct answer will have a true value and wrong ones will have a false value
  const options = page.options;

  // just the string choices as an array (with no boolean value that represents correctness)
  const optionKeys = Object.keys(options);

  // I put all the content that you need onto the screen for you
  return (
    <div className="container">
      <h1>{question}</h1>
      {optionKeys.map((option, index) => (
        <p key={index}>
          This choice: <b>{option}</b> is{" "}
          <b>
            <b>{options[option] ? "correct" : "incorrect"}</b>
          </b>
        </p>
      ))}
    </div>
  );
}

// lmk if you have any questions
