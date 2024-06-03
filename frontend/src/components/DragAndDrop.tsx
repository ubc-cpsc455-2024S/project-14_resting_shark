import { useEffect, useRef, useState } from "react";
import { DragAndDrop } from "../class/Content";
import "./DragAndDrop.css";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export default function DragAndDropQuestion({ page }: { page: DragAndDrop }) {
  const content = page.content;
  const draggableObject = page.draggable;
  const [parents, setParents] = useState<{ [key: string]: string | null }>({});

  const draggableKeys = Object.keys(draggableObject);

  return (
    <div className="outer-container">
      <DndContext onDragEnd={handleDragEnd}>
        <div className="padded-container">
          <div>Drag and Drop to complete the sentence.</div>
          <div className="blank-container-container">
            <p className="blank-container">
              {content.map((option, index) => {
                if (typeof option === "string") {
                  return <span key={index}>{option}</span>;
                } else {
                  const blankId = `blank-${index}`;
                  return (
                    <Droppable key={blankId} id={blankId}>
                      {parents[blankId] ? (
                        <Draggable dropped={true} id={parents[blankId]}>
                          <b>{parents[blankId]}</b>
                        </Draggable>
                      ) : (
                        ""
                      )}
                    </Droppable>
                  );
                }
              })}
            </p>
          </div>
        </div>
        <div className="options-container">
          {draggableKeys.map((option) => (
            <DraggableContainer key={option} option={option} parents={parents}>
              <Draggable id={option} dropped={false}>
                <b>{option}</b>
              </Draggable>
            </DraggableContainer>
          ))}
        </div>
      </DndContext>
    </div>
  );

  function handleDragEnd(event: { active: any; over: any }) {
    const { active, over } = event;
    if (over) {
      setParents((prevParent) => ({
        ...prevParent,
        [over.id]: active.id,
      }));
    } else {
      setParents((prevParent) => {
        const newParent = { ...prevParent };
        for (const key in newParent) {
          if (newParent[key] === active.id) {
            newParent[key] = null;
          }
        }
        return newParent;
      });
    }
  }
}

function Droppable(props: { id: any; children: any }) {
  const { setNodeRef } = useDroppable({
    id: props.id,
  });

  return (
    <span ref={setNodeRef} className="droppable">
      {props.children}
    </span>
  );
}

function Draggable(props: { id: any; children: any; dropped: boolean }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
    cursor: "grab",
  };

  return (
    <button
      className={props.dropped ? "draggable" : "draggable not-dropped"}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {props.children}
    </button>
  );
}

function DraggableContainer({
  option,
  parents,
  children,
}: {
  option: string;
  parents: { [key: string]: string | null };
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | null>(null);

  // + 0.1 since the padding makes multiple words become two lines without
  useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.offsetWidth + 0.1);
    }
  }, [ref, parents]);

  return (
    <div
      ref={ref}
      className="draggable-container"
      style={{ width: width ? `${width}px` : "auto" }}
    >
      {!Object.values(parents).includes(option) && children}
    </div>
  );
}
