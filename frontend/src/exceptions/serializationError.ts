class SerializationError extends Error {
  public code?: number;

  constructor(message: string, objectName: string) {
    super("Unable to serialize object: " + objectName + message); 
    this.name = this.constructor.name; 
    this.code = 500; 
  }
}

export default SerializationError;