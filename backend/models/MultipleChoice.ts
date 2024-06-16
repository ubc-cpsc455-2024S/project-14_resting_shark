import { Question } from "./Question";

export class MultipleChoice implements Question {
  public id: string;
  public type: "mc";
  public question: string;
  public options: { [key: string]: boolean };
}