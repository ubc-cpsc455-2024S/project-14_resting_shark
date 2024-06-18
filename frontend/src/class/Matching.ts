import Content from "./Content";

// terms and their corresponding definitions have the same 0-indexed number value
export default class Matching implements Content {
  id: string;
  type: "matching";
  terms: { [key: string]: number };
  definitions: { [key: string]: number };

  constructor(
    id: string,
    terms: { [key: string]: number },
    definitions: { [key: string]: number }
  ) {
    this.id = id;
    this.type = "matching";
    this.terms = terms;
    this.definitions = definitions;
  }

  // Matching to Json
  static serialize(instance: Matching): string {
    return JSON.stringify({
      type: instance.type,
      terms: instance.terms,
      definitions: instance.definitions,
    });
  }
}