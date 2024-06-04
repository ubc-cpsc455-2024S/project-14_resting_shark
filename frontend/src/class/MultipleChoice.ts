import Content from "./Content";

// options: value is true if the key is the correct answer, otherwise false
export default class MultipleChoice implements Content {
  type: "mc";
  question: string;
  options: { [key: string]: boolean };

  constructor(question: string, options: { [key: string]: boolean }) {
    this.type = "mc";
    this.question = question;
    this.options = options;
  }
}