import express, { Router, Request, Response } from 'express';
import authMiddleware from '../middleware/authMiddleware';

const router: Router = express.Router();


export { router as lessonHistoryRouter };
