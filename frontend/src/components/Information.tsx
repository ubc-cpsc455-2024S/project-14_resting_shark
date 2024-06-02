import { Info, Intro } from "../class/Content";
import "./Information.css";

// A page introducing content to users before they do questions
export default function Information({ page }: { page: Info | Intro }) {
  const title = page.title; // a single string representing the header
  const content = page.content; // a list of strings, each list item represents a paragraph
  const fact = page.fact; // a string representing the fun fact


  return (
    <div className="">
      <div>
        <h1>{title}</h1>
        <div>
          {content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
      <div className="fact-container">
      <div className="fact-box">
        <div className="fact-title">
          <h2>Did You Know?</h2>
          <img src="/Lesson/funfact.png" alt="funfact" />
        </div>
        <div className="fact-content">
          {fact}
        </div>
      </div>
      </div>
    </div>
  );
}