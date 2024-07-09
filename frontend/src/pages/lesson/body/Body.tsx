import { LuBot } from "react-icons/lu";
import { BodyProps } from "./Body.d";
import MainDisplay from "./main-display/MainDisplay";

export default function Body(props: BodyProps) {
  return (
    <div className="body">
      <div className="left-body">
        <ChaptersNav />
      </div>
      <div className="middle-body">
        <MainDisplay
          pageNumber={props.pageNumber}
          contentList={props.contentList}
          setPageNumber={props.setPageNumber}
          setButtonText={props.setButtonText}
          renderedPage={props.renderedPage}
          buttonText={props.buttonText}
          onSubmit={props.onSubmit} 
          gameOver={props.gameOver} 
        />
      </div>
      <div className="right-body">
        <AIHelper />
      </div>
    </div>
  );
}

function ChaptersNav() {
  return (
    <div className="left-container">
      <div className="chapters">
        <h1>Astronomy</h1>
        <div className="list-container">
          <ul>
            <li className="active">Intro</li>
            <li>The Sun</li>
            <li>Galaxies</li>
            <li>The Solar System</li>
            <li>Planets</li>
            <li>Stars</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function AIHelper() {
  return (
    <div className="ai-container">
      <div className="header">Need Help?</div>
      <div className="chat-bottom-border">
        <div className="chat-container">
          <div className="chat">
            <LuBot size={30} />
          </div>
          <div className="chat-button-container">
            <button>
              <span>I want a Hint!</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
