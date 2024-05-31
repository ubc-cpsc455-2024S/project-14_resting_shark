import { DragAndDrop } from "../class/Content";
import "./DragAndDrop.css";

export default function DragAndDropQuestion({ page }: { page: DragAndDrop }) {
  return (
    <div>
      <div>Drag and Drop Question</div>
      <div>{page.type}</div>
    </div>
  );
}
