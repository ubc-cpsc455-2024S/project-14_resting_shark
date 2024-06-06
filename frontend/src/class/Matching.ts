import Content from "./Content";
import DeserializationError from "../exceptions/deserializationError";

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

  // Matching to Json
  static serialize(instance: Matching): string {
    return JSON.stringify({
      type: instance.type,
      terms: instance.terms,
      definitions: instance.definitions,
    });
  }

  // Json to Matching
  static deserialize(json: string): Matching {
    const obj = JSON.parse(json);

    if (!obj.type || !obj.terms || !obj.definitions) {
      throw new DeserializationError("Missing one or more of: type, terms, or definitions field", "Matching");
    }

    // validate type
    if (obj.type !== "matching") {
      throw new DeserializationError(`Expected type 'matching', but json is of type '${String(obj.type)}'`, "Matching");
    }

    // validate terms
    if (
      typeof obj.terms !== "object" || 
      obj.terms === null || 
      Array.isArray(obj.terms) || 
      !Object.keys(obj.terms).every(key => typeof key === "string" && Number.isInteger(obj.terms[key]))
    ) {
      throw new DeserializationError("Terms must be an object with keys as strings and values as integers", "Matching");
    }

    // validate defitions
    if (
      typeof obj.definitions !== "object" || 
      obj.definitions === null || 
      Array.isArray(obj.definitions) || 
      !Object.keys(obj.definitions).every(key => typeof key === "string" && Number.isInteger(obj.definitions[key]))
    ) {
      throw new DeserializationError("Definitions must be an object with keys as strings and values as integers", "Matching");
    }

    return new Matching(obj.terms, obj.definitions);
  }
}