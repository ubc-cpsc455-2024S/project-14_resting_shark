import Lesson from '../models/Lesson';
import openAIService from './openAIService';
import { v4 as uuid4 } from 'uuid';
import mongoose from 'mongoose';
import ErrorWithCode from "../errors/ErrorWithCode";

class LessonService {

  // summary that is displayed on dashboard
  public async getLessonsSummary(userId : string) {
    try {
      const lessons = await Lesson.find({ instanceOwner: userId });
      const result = lessons.map(lesson => {
        return {
          _id: lesson._id,
          name: lesson.name,
          lives: lesson.lives,
          totalPages: lesson.content.length,
          completedPages: lesson.pageProgress + 1
        }
      });

      return result;

    } catch (error: any) {
      console.error('Error:', error);
      throw error;
    }
  }

  // returns an entire lesson
  public async getLesson(lessonId: string) {
    try {
      const lesson = await Lesson.findById(lessonId);
      return lesson;
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  }

  // deletes a lesson
  public async deleteLesson(lessonId: string) {
    try {
      const lesson = await Lesson.findByIdAndDelete(lessonId);
      return lesson;
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  }

    // updates a lesson
    public async updateLesson(lessonId: string, lesson: any) {
      try {
        const updatedLesson = await Lesson.findByIdAndUpdate(lessonId, lesson, { new: true });
        if (!updatedLesson) {
          const error: ErrorWithCode = new Error(`Lesson with id ${lessonId} not found`);
          error.code = 404;
          throw error;
        }

        return updatedLesson;
      } catch (error: any) {
        console.error(error);
        throw error;
      }
    }

    public async getLessonOfTheDay() {
      try {
        const SYSTEM_USER = process.env.SYSTEM_USERID as string
        console.log(SYSTEM_USER)
        const systemUserId = new mongoose.Types.ObjectId(SYSTEM_USER);
        const lessons = await Lesson.find({ author: systemUserId }).sort({ date: 1 });
        
        const currentDate = new Date();
        // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
        const dayOfWeekIndex = currentDate.getDay();
        const lesson = lessons[dayOfWeekIndex];

        return lesson;
      } catch (error: any) {
        console.error(error);
        throw error;
      }
    }

  // get all lessons except for current user
  public async getAllLessonSummary(userId: string) {
    const userObjectId = new mongoose.Types.ObjectId(userId);

    try {
      // we only get the "original" lessons and not copies to avoid dups
      const lessons = await Lesson.find({
        instanceOwner: { $ne: userObjectId }, // instanceOwner is not equal to userId
        $expr: { $eq: ['$instanceOwner', '$author'] } // instanceOwner is equal to author
      })
      .select('_id name');

      return lessons;
    } catch (error: any) {
      console.error('Error:', error);
      throw error;
    }
  }

  // uses openai to generate, validate, parse, save, and return lesson
  public async generateLesson(userId: string, content: string) {
    try {
      const response = await openAIService.generateLesson(userId, content);
      const lesson = await this.createAndSaveNewLesson(userId, response);
      return lesson;
    } catch (error: any) {
      console.error('Error: ', error);
      throw new Error(error.message.toString());
    }
  }

  // add metadata, fix ids, and save to db
  private async createAndSaveNewLesson(userId: string, content: any) {
    for (let i = 0; i < content.length; i++) {
      const obj = content[i];

      // make new ids for each item in lesson content (since the one returned by openai is not valid)
      obj.id = uuid4();

      // if "type" does not exist or is not valid, throw away the entire object
      if (
        obj.type != 'intro' &&
        obj.type != 'info' &&
        obj.type != 'dnd' &&
        obj.type != 'matching'&&
        obj.type != 'mc'
        ) {
          content.splice(i, 1);
          i--;
        }
    }

    // try to get user id obj from user id string
    let authorId;
    try {
      authorId = new mongoose.Types.ObjectId(userId);
    } catch (error) {
      console.error('Invalid userId format:', error);
      throw error;
    }

    // get lesson name from intro paragraph
    const lessonName = content[0]?.title || "Placeholder Lesson Name";

    // create new lesson
    const newLesson = new Lesson({
      name: lessonName,
      author: authorId, 
      instanceOwner: authorId,
      lives: 3,
      streakCount: 0,
      pageProgress: -1, // page progress is set to -1 if this lesson has never been opened before
      highScore: 0,
      currentScore: 0,
      content: content
    });

    // save new lesson
    try {
      const savedLesson = await newLesson.save();
    } catch (error) {
      console.error('Error saving new lesson:', error);
    }

    return newLesson;
  }

  // copies a lesson (aka creates an "instance") with the given user as instanceOwner
  public async copyLesson(userId: string, lessonId: string) {
    // try to find lesson
    let lesson;
    try {
      lesson = await Lesson.findById(lessonId).lean();
      if (!lesson) {
        const error: ErrorWithCode = new Error("Lesson not found");
        error.code = 404;
        throw error;
      }
    } catch (error) {
      throw error;
    }

    // turn userid string into object id
    let userObjId;
    let authorObjId;
    try {
      userObjId = new mongoose.Types.ObjectId(userId);
      authorObjId = new mongoose.Types.ObjectId(lesson.author);
    } catch (error) {
      console.error('Invalid userId format:', error);
      throw error;
    }

    // Check if the user already has an instance of the lesson
    const existingInstance = await Lesson.findOne({
      author: lesson.author,
      instanceOwner: userObjId 
    });

    if (existingInstance) {
      const error: ErrorWithCode = new Error("User already has an instance of this lesson");
      error.code = 409;
      throw error;
    }

    // remove lesson id from given lesson
    const { _id, ...lessonData } = lesson;
    const copiedLesson = new Lesson({
      ...lessonData,
      instanceOwner: userObjId
    });

    // save
    try {
      const savedLesson = await copiedLesson.save();
      console.log('New lesson saved:', savedLesson);
    } catch (error) {
      console.error('Error saving new lesson:', error);
    }

    return copiedLesson;
  }
}

export default new LessonService();
