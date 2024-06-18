import Content from "./Content";

// content: each array item is one paragraph
// fact: fun fact
export default class Info implements Content {
  id: string;
  type: "info";
  title: string;
  content: string[];
  fact: string;

  constructor(id: string, title: string, content: string[], fact: string) {
    this.id = id;
    this.type = "info";
    this.title = title;
    this.content = content;
    this.fact = fact;
  }
}