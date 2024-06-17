import Content from "./Content";
import DeserializationError from "../exceptions/deserializationError";

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

  // Info to json
  static serialize(instance: Info): string {
    return JSON.stringify({
      id: instance.id,
      type: instance.type,
      title: instance.title,
      content: instance.content,
      fact: instance.fact,
    });
  }

  // json to Info
  static deserialize(json: string): Info {
    const obj = JSON.parse(json);

    if (!obj.type || !obj.title || !obj.content || !obj.fact) {
      throw new DeserializationError("Missing one or more of: type, title, content, or fact field", "Info");
    }

    // validate type
    if (obj.type !== "info") {
      throw new DeserializationError(`expected type 'info', but json is of type '${String(obj.type)}'`, "Info");
    }

    // validate title
    if (typeof obj.title !== "string") {
      throw new DeserializationError("title must be a string", "Info");
    }

    // validate content
    if (!Array.isArray(obj.content) || !obj.content.every((item: any) => typeof item === "string")) {
      throw new DeserializationError("content must be an array of strings", "Info");
    }

    // validate fact
    if (typeof obj.fact !== "string") {
      throw new DeserializationError("Fact must be a string", "Info");
    }

    return new Info(obj.id, obj.title, obj.content, obj.fact);
  }
}