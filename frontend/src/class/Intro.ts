import Content from "./Content";

// content: each array item is one paragraph
// fact: fun fact
export default class Intro implements Content {
  id: string;
  type: "intro";
  title: string;
  content: string[];
  fact: string;

  constructor(id: string, title: string, content: string[], fact: string) {
    this.type = "intro";
    this.title = title;
    this.content = content;
    this.fact = fact;
    this.id = id;
  }
}