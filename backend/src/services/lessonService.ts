import Lesson from '../models/Lesson';
import openAIService from './openAIService';
import { v4 as uuid4 } from 'uuid';
import mongoose from 'mongoose';

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
      return; 
    }

    // get lesson name from intro paragraph
    const lessonName = content[0]?.title || "Placeholder Lesson Name";

    // create new lesson
    const newLesson = new Lesson({
      name: lessonName,
      author: authorId, 
      lives: 3,
      streakCount: 0,
      pageProgress: 0,
      highScore: 0,
      currentScore: 0,
      content: content
    });

    // save new lesson
    try {
      const savedLesson = await newLesson.save();
      console.log('New lesson saved:', savedLesson);
    } catch (error) {
      console.error('Error saving new lesson:', error);
    }

    return newLesson;
  }
}

export default new LessonService();
