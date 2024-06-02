import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  useState,
} from "react";
import { DragAndDrop } from "../class/Content";
import "./DragAndDrop.css";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export default function DragAndDropQuestion({ page }: { page: DragAndDrop }) {
  const content = page.content;
  const draggableMap = page.draggable;
  const [parent, setParent] = useState(null);
  const draggableKeys = Array.from(draggableMap.keys());

  const draggable = <Draggable id="draggable">Go ahead, drag me.</Draggable>;

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div>Drag and Drop to complete the sentence.</div>
      <div>
        {" "}
        {!parent ? draggable : null}
        <Droppable id="droppable">
          {parent === "droppable" ? draggable : "Drop here"}
        </Droppable>
      </div>
      <p className="blank-container">
        {content.map((option, index) => {
          if (typeof option === "string") {
            return <span key={index}>{option}</span>;
          } else {
            return <span key={index}>{option}</span>;
          }
        })}
      </p>
      <div className="options-container">
        {draggableKeys.map((option, index) => (
          <p key={index}>
            This draggable: <b>{option}</b> belongs in blank{" "}
            <b>
              <b>{draggableMap.get(option)}</b>
            </b>
          </p>
        ))}
      </div>
    </DndContext>
  );

  function handleDragEnd({ over }: { over: any }) {
    setParent(over ? over.id : null);
  }
}

function Droppable(props: {
  id: any;
  children:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ReactPortal
    | null
    | undefined;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style = {
    opacity: isOver ? 1 : 0.5,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}

function Draggable(props: {
  id: any;
  children:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ReactPortal
    | null
    | undefined;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });
  const style = {
    // Outputs `translate3d(x, y, 0)`
    transform: CSS.Translate.toString(transform),
  };

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </button>
  );
}
