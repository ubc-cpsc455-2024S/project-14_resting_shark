export interface Content {
  type: "intro" | "info" | "mc" | "dnd" | "matching";
}

// content: each array item is one paragraph
// fact: fun fact
export class Intro implements Content {
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

// content: each array item is one paragraph
// fact: fun fact
export class Info implements Content {
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

// content: numbers for blank, string for sentences
// draggable: draggable strings
// answer: key is the blank number, value is its corresponding draggable string
export class DragAndDrop implements Content {
  type: "dnd";
  content: any[];
  draggable: string[];
  answer: Map<number, string>;

  constructor(content: any[], draggable: any[], answer: Map<number, string>) {
    this.type = "dnd";
    this.content = content;
    this.draggable = draggable;
    this.answer = answer;
  }
}

// options: value is true if the key is the correct answer, otherwise false
export class MultipleChoice implements Content {
  type: "mc";
  question: string;
  options: Map<string, boolean>;

  constructor(question: string, options: Map<string, boolean>) {
    this.type = "mc";
    this.question = question;
    this.options = options;
  }
}

// answers: key is term, value is its corresponding definition
export class Matching implements Content {
  type: "matching";
  terms: string[];
  definitions: string[];
  answers: Map<string, string>;

  constructor(
    terms: string[],
    definitions: string[],
    answers: Map<string, string>
  ) {
    this.type = "matching";
    this.terms = terms;
    this.definitions = definitions;
    this.answers = answers;
  }
}
