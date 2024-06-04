import Content from "./Content";

// terms and their corresponding definitions have the same 0-indexed number value
export default class Matching implements Content {
  type: "matching";
  terms: { [key: string]: number };
  definitions: { [key: string]: number };

  constructor(
    terms: { [key: string]: number },
    definitions: { [key: string]: number }
  ) {
    this.type = "matching";
    this.terms = terms;
    this.definitions = definitions;
  }
}