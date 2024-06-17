import Content from "./Content";
import DeserializationError from "../exceptions/deserializationError";

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

  // Intro to json
  static serialize(instance: Intro): string {
    return JSON.stringify({
      type: instance.type,
      title: instance.title,
      content: instance.content,
      fact: instance.fact,
    });
  }

// Json to Intro
static deserialize(json: string): Intro {
  const obj = JSON.parse(json);

  if (!obj.type || !obj.title || !obj.content || !obj.fact) {
    throw new DeserializationError("Missing one or more of: type, title, content, or fact field", "Intro");
  }

  //validate type
  if (obj.type !== "intro") {
    throw new DeserializationError(`Expected type 'intro', but json is of type '${String(obj.type)}'`, "Intro");
  }

  //validate title
  if (typeof obj.title !== "string") {
    throw new DeserializationError("Title must be a string", "Intro");
  }

  // validate content
  if (!Array.isArray(obj.content) || !obj.content.every((item: any) => typeof item === "string")) {
    throw new DeserializationError("Content must be an array of strings", "Intro");
  }

  // validate fact
  if (typeof obj.fact !== "string") {
    throw new DeserializationError("Fact must be a string", "Intro");
  }

  return new Intro(obj.id, obj.title, obj.content, obj.fact);
}
}