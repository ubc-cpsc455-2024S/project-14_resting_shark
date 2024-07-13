import express, { Router, Request, Response } from 'express';
import authMiddleware from '../middleware/authMiddleware';
import userService from '../services/userService';

const router: Router = express.Router();

/*
deletes a user by id from jwt token
*/
router.delete('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    console.log(req.user.id)
    const userId = req.user.id;
    const lessons = await userService.deleteUser(userId);
    res.status(200).json(lessons);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export { router as usersRouter };