import Content from "./Content";
import DeserializationError from "../exceptions/deserializationError";

// options: value is true if the key is the correct answer, otherwise false
export default class MultipleChoice implements Content {
  type: "mc";
  question: string;
  options: { [key: string]: boolean };

  constructor(question: string, options: { [key: string]: boolean }) {
    this.type = "mc";
    this.question = question;
    this.options = options;
  }

  // MultipleChoice to json
  static serialize(instance: MultipleChoice): string {
    return JSON.stringify({
      type: instance.type,
      question: instance.question,
      options: instance.options,
    });
  }

  // Json to MultipleChoice
  static deserialize(json: string): MultipleChoice {
    const obj = JSON.parse(json);

    if (!obj.type || !obj.question || !obj.options) {
      throw new DeserializationError("Missing one or more of: type, question, or options field", "MultipleChoice");
    }

    if (obj.type !== "mc") {
      throw new DeserializationError(`expected type 'mc', but json is of type. '${String(obj.type)}'`, "MultipleChoice");
    }

    // validate question
    if (typeof obj.question !== "string") {
      throw new DeserializationError("Question must be a string", "MultipleChoice");
    }

    // validate options
    if (
      typeof obj.options !== "object" || 
      obj.options === null || 
      Array.isArray(obj.options) || 
      !Object.keys(obj.options).every(key => typeof key === "string" && typeof obj.options[key] === "boolean")
    ) {
      throw new DeserializationError("options must be an object with keys as strings and values as booleans", "MultipleChoice");
    }

    return new MultipleChoice(obj.question, obj.options);
  }
}
