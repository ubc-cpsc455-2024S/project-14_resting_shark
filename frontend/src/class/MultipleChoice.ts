import Content from "./Content";

// options: value is true if the key is the correct answer, otherwise false
export default class MultipleChoice implements Content {
  id: string;
  type: "mc";
  question: string;
  options: { [key: string]: boolean };

  constructor(id: string, question: string, options: { [key: string]: boolean }) {
    this.id = id;
    this.type = "mc";
    this.question = question;
    this.options = options;
  }
}
