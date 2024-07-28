import LessonHistory from '../models/LessonHistory';
import mongoose from 'mongoose';
import ErrorWithCode from "../errors/ErrorWithCode";

class LessonHistoryService {
  public async record(userId, lessonId) {
    const userObjId = new mongoose.Types.ObjectId(userId);
    const lessonObjId = new mongoose.Types.ObjectId(lessonId);
    
    try {
      await LessonHistory.create({
        userId: userObjId,
        lessonId: lessonObjId,
        timestamp: new Date()
      });
    } catch (error) {
      console.error("Error recording lesson history: ", error.message);
      throw error;
    }
  }
}

export default new LessonHistoryService();
