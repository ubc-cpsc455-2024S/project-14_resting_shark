class DeserializationError extends Error {
  public code?: number;

  constructor(message: string, objectName: string) {
    super("Unable to deserialize object: " + objectName + message); 
    this.name = this.constructor.name; 
    this.code = 500; 
  }
}

export default DeserializationError;