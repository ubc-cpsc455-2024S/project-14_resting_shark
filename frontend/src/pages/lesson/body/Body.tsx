import { requests } from "../../../api/requestTemplate";
import { BodyProps } from "./Body.d";
import { useState } from "react";
import "./AiHelper.css";
import MainDisplay from "./main-display/MainDisplay";
import { LuBot } from "react-icons/lu";
import * as React from "react";

export default function Body(props: BodyProps) {
  return (
    <div className="body">
      <div className="left-body">
        <ChaptersNav chapters={props.chapters} pageNumber={props.pageNumber} />
      </div>
      <div className="middle-body">
        <MainDisplay
          pageNumber={props.pageNumber}
          contentList={props.contentList}
          setPageNumber={props.setPageNumber}
          setButtonText={props.setButtonText}
          renderedPage={props.renderedPage}
          buttonText={props.buttonText}
          lives={props.lives}
          streak={props.streak}
          lessonId={props.lessonId}
        />
      </div>
      <div className="right-body">
        <AIHelper />
      </div>
    </div>
  );
}

function ChaptersNav(props: { chapters: any; pageNumber: number }) {
  return (
    <div className="left-container">
      <div className="chapters">
        <h1>{props.chapters.title}</h1>
        <div className="list-container">
          <ul>
            {props.chapters.chapters &&
              props.chapters.chapters.map((item: string, index: number) => (
                <li
                  className={props.pageNumber == index ? "active" : ""}
                  key={index}
                >
                  {item}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

type Message = {
  user: string;
  text: string;
};

const AIHelper = () => {
  const [chatLog, setChatLog] = useState<Message[]>([]);
  const [prompt, setPrompt] = useState("");
  const [isHintRequested, setIsHintRequested] = useState(false);

  const handleSendMessage = async () => {
    const token = localStorage.getItem("jwtToken") ?? undefined;

    if (!prompt) return;

    const userMessage: Message = { user: "user", text: prompt };
    setChatLog((prevLog) => [...prevLog, userMessage]);

    try {
      const data = await requests.postRequest(token, "/lesson/api/chat", {
        prompt,
      });
      const botMessage: Message = { user: "bot", text: data.reply };
      // console.log("Here is the AI Helper messge: ", botMessage);
      setChatLog((prevLog) => [...prevLog, botMessage]);
      setPrompt("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="ai-container">
      <div className="header">Need Help?</div>
      <div className="chat-bottom-border">
        <div className={`chat-container ${isHintRequested ? "expanded" : ""}`}>
          <div className="chat">
            <LuBot size={50} />
            {chatLog.map((message, index) => (
              <div
                key={index}
                className={
                  message.user === "bot" ? "bot-message" : "user-message"
                }
              >
                {message.user === "bot" ? "HelperAI: " : "User: "}
                {message.text}
              </div>
            ))}
          </div>
          <div className="chat-button-container">
            {!isHintRequested ? (
              <button onClick={() => setIsHintRequested(true)}>
                <span>I want a Hint!</span>
              </button>
            ) : (
              <div className="chat-input-container">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Type your message..."
                />
                <button onClick={handleSendMessage}>Send</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
