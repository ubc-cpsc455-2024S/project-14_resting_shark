import express, { Router, Request, Response } from 'express';
import authMiddleware from '../middleware/authMiddleware';
import lessonService from '../services/lessonService';
import openAIService from '../services/openAIService';
import Lesson from '../models/Lesson';

const router: Router = express.Router();

/*
Gets summary of all lessons for a given user
Returns a list of lessons with _id and name
*/
router.get('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const lessons = await lessonService.getLessonsSummary(userId);
    res.status(200).json(lessons);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

/*
Gets a full lesson, with each component inside of the contents list
Reauest params:
  - id: the id of the lesson
// stub 
// TODO
*/
router.get('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const lessonId = req.params.id;
    const lesson = await lessonService.getLesson(lessonId);
    res.status(200).json(lesson);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});


/*
generates a lesson using openai based on a given contents string, then returns the lesson.
*/
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  const userId = req.user.id;
  const { content } = req.body;
  try {
    const lesson = await lessonService.generateLesson(userId, content);
    res.status(200).json(lesson);
  } catch (error: any) {
    res.status(error.code || 500).json({ message: error.message });
  }
});

export { router as lessonsRouter };
