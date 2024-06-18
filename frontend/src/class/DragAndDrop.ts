import Content from "./Content";

// content: 0-indexed numbers for blank, string for sentences
// draggable: value is the blank number (-1 if it does not belong in a blank), key is its corresponding draggable string
export default class DragAndDrop implements Content {
  id: string;
  type: "dnd";
  content: string[] | number[];
  draggable: { [key: string]: number };

  constructor(
    id: string,
    content: string[] | number[],
    draggable: { [key: string]: number }
  ) {
    this.id = id;
    this.type = "dnd";
    this.content = content;
    this.draggable = draggable;
  }
}