import LessonHistory from '../models/LessonHistory';
import mongoose from 'mongoose';
import ErrorWithCode from "../errors/ErrorWithCode";

class LessonHistoryService {
  public async record(userId: string, lessonId: string) {
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

  // returns an array of object with fields "date" and "count" representing number of lessons completed each day
  // start and end are iso date strings
  public async getLessonsCompleted(userId: string, start: string, end: string) {
    const userObjId = new mongoose.Types.ObjectId(userId);
    const startDate = new Date(start);
    const endDate = new Date(end);
    
    try {
      const lessonsCompleted = await LessonHistory.aggregate([
        {
          // matches all documents of the correct user id and dates
          $match: {
            userId: userObjId,
            timestamp: {
              $gte: startDate,
              $lte: endDate
            }
          }
        },
        {
          // groups by day and counts
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$timestamp" }
            },
            count: { $sum: 1 }
          }
        },
        // sort ascending
        {
          $sort: { "_id": 1 }
        }
      ]);

      // Transform the result to an array of counts
      const result = lessonsCompleted.map(entry => ({
        date: entry._id,
        count: entry.count
      }));

      return {
        completedLessonsByDay: result,
      };
    } catch (error) {
      console.error("Error fetching lessons completed: ", error.message);
      throw error;
    }
  }
}

export default new LessonHistoryService();
