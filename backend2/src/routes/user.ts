import express, { Router, Request, Response } from 'express';
import authMiddleware from '../middleware/authMiddleware';
import userService from '../services/userService';
import ErrorWithCode from '../errors/ErrorWithCode';

const router: Router = express.Router();

/*
deletes a user by id from jwt token
*/
router.delete('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const lessons = await userService.deleteUser(userId);
    res.status(200).json(lessons);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});


/*
gets stats for a user. TODO: this is used for profile page, edit model to include all info needed to return full stats
*/
router.get('/stats', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const stats = await userService.getUserStats(userId);
    console.log(userId)
    console.log(stats)
    res.status(200).json(stats);
  } catch (error: any) {
    res.status(error.code || 500).json({ message: error.message });
  }
});


router.put('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const updateData = req.body;

    if (!updateData.username && !updateData.email && !updateData.password) {
      return res.status(400).json({ message: "No update data provided" });
    }

    const updatedUser = await userService.updateUser(userId, updateData);
    res.status(200).json(updatedUser);
  } catch (error: any) {
    res.status(error.code || 500).json({ message: error.message });
  }
});
export { router as usersRouter };