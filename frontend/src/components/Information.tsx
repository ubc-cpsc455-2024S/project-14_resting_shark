import { Info, Intro } from "../class/Content";
import "./Information.css";

// A page introducing content to users before they do questions
export default function Information({ page }: { page: Info | Intro }) {
  const title = page.title; // a single string representing the header
  const content = page.content; // a list of strings, each list item represents a paragraph
  const fact = page.fact; // a string representing the fun fact

  // I put all the content you need onto the screen for you
  // put all your css in Information.css
  return (
    <div>
      <div>
        <h1>{title}</h1>
        <div>
          {content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
      <div className="fact-container">{fact}</div>
    </div>
  );
}
