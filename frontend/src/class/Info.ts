import Content from "./Content";

// content: each array item is one paragraph
// fact: fun fact
export default class Info implements Content {
  type: "info";
  title: string;
  content: string[];
  fact: string;

  constructor(title: string, content: string[], fact: string) {
    this.type = "info";
    this.title = title;
    this.content = content;
    this.fact = fact;
  }
}