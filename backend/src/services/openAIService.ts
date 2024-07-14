import Lesson from "../models/Lesson";
import ErrorWithCode from "../errors/ErrorWithCode";

class OpenAIService {

  public async generateLesson(userId : string, content: string) {
    try {
      // do smth here
    } catch (error: any) {
      console.error('Error: ', error);
      throw new Error(error.message);
    }
  }
}

export default new OpenAIService();
