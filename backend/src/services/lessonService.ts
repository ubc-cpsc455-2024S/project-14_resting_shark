import Lesson from '../models/Lesson';
import openAIService from './openAIService';

class LessonService {

  public async getLessonsSummary(userId : string) {
    try {
      const lessons = await Lesson.find({ author: userId }).select('name _id');
      return lessons;

    } catch (error: any) {
      console.error('Error:', error);
      throw new Error(error.message.toString());
    }
  }

  public async generateLesson(userId: string, content: string) {
    try {
      const response = await openAIService.generateLesson(userId, content);
      return response;
    } catch (error: any) {
      console.error('Error: ', error);
      throw new Error(error.message.toString());
    }
  }
}

export default new LessonService();
