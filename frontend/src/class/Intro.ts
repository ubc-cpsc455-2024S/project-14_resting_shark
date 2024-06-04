import Content from "./Content";

// content: each array item is one paragraph
// fact: fun fact
export default class Intro implements Content {
  type: "intro";
  title: string;
  content: string[];
  fact: string;

  constructor(title: string, content: string[], fact: string) {
    this.type = "intro";
    this.title = title;
    this.content = content;
    this.fact = fact;
  }
}