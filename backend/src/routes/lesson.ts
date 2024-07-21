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

/*
Creates a new lesson in the database
*/
router.post('/create', authMiddleware, async (req: Request, res: Response) => {
  const userId = req.user.id;
  const { name, contents } = req.body;
  try {
    const lesson = new Lesson({ userId, name, contents });
    await lesson.save();
    res.status(201).json(lesson);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

/*
Deletes an existing lesson from the database
Request params:
  - id: the id of the lesson to delete
*/
router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const lessonId = req.params.id;
    const userId = req.user.id;
    const lesson = await Lesson.findOneAndDelete({ _id: lessonId, userId });
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    res.status(200).json({ message: 'Lesson deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

/*
Edits part of a lesson in the database
Request params:
  - id: the id of the lesson to edit
Request body:
  - Any fields to update (e.g., name, contents)
*/
router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const lessonId = req.params.id;
    const userId = req.user.id;
    const updates = req.body;
    const lesson = await Lesson.findOneAndUpdate({ _id: lessonId, userId }, updates, { new: true });
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    res.status(200).json(lesson);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export { router as lessonsRouter };