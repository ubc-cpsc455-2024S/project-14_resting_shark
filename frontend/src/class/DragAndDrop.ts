import DeserializationError from "../exceptions/deserializationError";
import Content from "./Content";

// content: 0-indexed numbers for blank, string for sentences
// draggable: value is the blank number (-1 if it does not belong in a blank), key is its corresponding draggable string
export default class DragAndDrop implements Content {
  type: "dnd";
  content: string[] | number[];
  draggable: { [key: string]: number };

  constructor(
    content: string[] | number[],
    draggable: { [key: string]: number }
  ) {
    this.type = "dnd";
    this.content = content;
    this.draggable = draggable;
  }

  // DragAndDrop to json
  static serialize(instance: DragAndDrop): string {
    return JSON.stringify({
      type: instance.type,
      content: instance.content,
      draggable: instance.draggable,
    });
  }

  
  // Json to DragAndDrop
  static deserialize(json: string): DragAndDrop {
    const obj = JSON.parse(json);

    if (!obj.type || !obj.content || !obj.draggalbe) {
      throw new DeserializationError("Missing one or more of: type, content, or draggable field", "DragAndDrop");
    }

    //validate type
    if (obj.type !== "dnd") {
      throw new DeserializationError(`Expected type 'dnd', but json is of type '${String(obj.type)}'`, "DragAndDrop");
    }

    // validate content
    if (!Array.isArray(obj.content) || !obj.content.every((item: any) => typeof item === "string" || typeof item === "number")) {
      throw new DeserializationError("Content must be an array of Strings or Numbers", "DragAndDrop");
    }

    // validate that draggable is a map
    if (typeof obj.draggable !== "object" || obj.draggable === null || Array.isArray(obj.draggable)) {
      throw new DeserializationError("Draggable has to be an object/map!", "DragAndDrop");
    }

    // validate each key value pair
    for (const key in obj.draggable) {
      if (typeof key !== "string" || typeof obj.draggable[key] !== "number" || !Number.isInteger(obj.draggable[key])) {
        throw new DeserializationError("draggable obj must be have key: string and value: integer", "DragAndDrop");
      }
    }

    return new DragAndDrop(obj.content, obj.draggable);
  }
}