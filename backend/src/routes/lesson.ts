import express, { Router, Request, Response } from 'express';
import authMiddleware from '../middleware/authMiddleware';
import lessonService from '../services/lessonService';

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

export { router as lessonsRouter };
