import { LuBadgeHelp } from "react-icons/lu";
import "./Information.css";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  Key,
  useEffect,
} from "react";
import { useLessonContext } from "../../context/LessonProvider";
import Info from "../../class/Info";
import Intro from "../../class/Intro";

// A page introducing content to users before they do questions
export default function Information({ page }: { page: Info | Intro }) {
  const title = page.title; // a single string representing the header
  const content = page.content; // a list of strings, each list item represents a paragraph
  const fact = page.fact; // a string representing the fun fact

  const { setCanProgress, setIsQuestionPage } = useLessonContext();

  useEffect(() => {
    setCanProgress(true);
    setIsQuestionPage(false);
  }, []);

  return (
    <div className="padded-container-2">
      <div className="title-container">
        <h1>{title}</h1>
        <div>
          {content.map(
            (
              paragraph:
                | string
                | number
                | boolean
                | ReactElement<any, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | ReactPortal
                | null
                | undefined,
              index: Key | null | undefined
            ) => (
              <p key={index}>{paragraph}</p>
            )
          )}
        </div>
      </div>
      <div className="fact-container">
        <div className="fact-box">
          <div className="fact-title">
            <h2>Did You Know?</h2>
            <LuBadgeHelp size={25} />
          </div>
          <div className="fact-content">{fact}</div>
        </div>
      </div>
    </div>
  );
}
