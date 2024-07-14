import Lesson from '../models/Lesson';

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

  public generateLesson(userId: string, content: string) {
    // stub
  }
}

export default new LessonService();
