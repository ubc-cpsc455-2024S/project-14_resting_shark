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

// content: 0-indexed numbers for blank, string for sentences
// draggable: value is the blank number (-1 if it does not belong in a blank), key is its corresponding draggable string
export class DragAndDrop implements Content {
  type: "dnd";
  content: string[] | number[];
  draggable: Map<string, number>;

  constructor(content: string[] | number[], draggable: Map<string, number>) {
    this.type = "dnd";
    this.content = content;
    this.draggable = draggable;
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

// terms and their corresponding definitions have the same 0-indexed number value
export class Matching implements Content {
  type: "matching";
  terms: Map<string, number>;
  definitions: Map<string, number>;

  constructor(terms: Map<string, number>, definitions: Map<string, number>) {
    this.type = "matching";
    this.terms = terms;
    this.definitions = definitions;
  }
}
