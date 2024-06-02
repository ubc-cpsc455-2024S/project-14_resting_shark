import { DragAndDrop } from "../class/Content";
import "./DragAndDrop.css";

export default function DragAndDropQuestion({ page }: { page: DragAndDrop }) {
  const content = page.content;
  const draggableMap = page.draggable;

  const draggable = Array.from(draggableMap.keys());
  return (
    <div className="container">
      <div>Drag and Drop to complete the sentence.</div>
      <p className="blank-container">
        {content.map((option, index) => (
          <span key={index}>{option}</span>
        ))}
      </p>
      <div className="options-container">
        {draggable.map((option, index) => (
          <p key={index}>
            This draggable: <b>{option}</b> belongs in blank{" "}
            <b>
              <b>{draggableMap.get(option)}</b>
            </b>
          </p>
        ))}
      </div>
    </div>
  );
}
