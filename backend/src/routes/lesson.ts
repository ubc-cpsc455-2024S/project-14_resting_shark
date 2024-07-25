import express, { Router, Request, Response } from 'express';
import authMiddleware from '../middleware/authMiddleware';
import lessonService from '../services/lessonService';
import openAIService from '../services/openAIService';
import multer from 'multer';
import pdfParse from 'pdf-parse';
import fs from 'fs';

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
makes and returns a fresh copy of someone else's lesson, where the instanceOwner will be the current user
Reauest params:
  - id: the id of the lesson to be copied
*/
router.get('/copy/:id', authMiddleware, async (req: Request, res: Response) => {
  const userId = req.user.id;
  const lessonId = req.params.id;

  try {
    const lesson = await lessonService.copyLesson(userId, lessonId);
    res.status(200).json(lesson);
  } catch (error: any) {
    res.status(error.code || 500).json({ message: error.message });
  }
})


/*
Handles chat requests by sending a user prompt to the OpenAI service and returning the response.
Request Body:
  - prompt: The text input from the user for which a response is requested.
*/
router.post('/api/chat', authMiddleware, async (req: Request, res: Response) => {
  const { prompt } = req.body;

  try {
    const reply = await openAIService.getChatResponse(prompt);
    res.status(200).json({ reply });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
});

const upload = multer({ dest: "./uploads/" });

router.post("/api/upload", upload.single("file"), async (req: Request, res: Response) => {
  try {
    const file = (req as any).file;
    if (!file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    const dataBuffer = fs.readFileSync(file.path);
    const data = await pdfParse(dataBuffer);
    res.json({ text: data.text });
  } catch (error) {
    res.status(500).json({ error: "Failed to process PDF" });
  }
});

export { router as lessonsRouter };
