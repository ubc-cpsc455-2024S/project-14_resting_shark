import { Question } from "./Question";

export class MultipleChoice implements Question {
  public id: string;
  public type: "matching";
  public terms: { [key: string]: number };
  public definitions: { [key: string]: number };
}