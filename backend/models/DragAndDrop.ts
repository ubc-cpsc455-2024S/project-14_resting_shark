import { Question } from "./Question";

export class DragAndDrop implements Question {
  public id: string;
  public type: "dnd";
  public content: string[] | number[];
  public draggable: { [key: string]: number };
}