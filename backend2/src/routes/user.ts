import express, { Router, Request, Response } from 'express';
import authMiddleware from '../middleware/authMiddleware';
import userService from '../services/userService';
import profileService from '../services/profileService';
import ErrorWithCode from '../errors/ErrorWithCode';
import lessonHistoryService from '../services/lessonHistoryService';

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
  given two iso date strings, will return all user information and the number of lessons completed for each day within the range in an array.
  POST body:
    - start: String -> an iso date string representing start date
    - end: String -> an iso date string representing end date

  returns:
  {
    ...userData,
    completedLessonsByDay: [], //  an array of object with fields "date" and "count" representing number of lessons completed each day
  }
*/
router.post('/stats', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { start, end } = req.body;
    const user = await userService.getUser(userId);
    const stats = await lessonHistoryService.getLessonsCompleted(userId, start, end);
    res.status(200).json({
      ...user,
      ...stats,
    });
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

    const updatedUser = await userService.updateUserPersonalInfo(userId, updateData);
    res.status(200).json(updatedUser);
  } catch (error: any) {
    res.status(error.code || 500).json({ message: error.message });
  }
});

/*
  given a user object, will update all non personal information fields (not username, return all user information and the number of lessons completed for each day within the range in an array.
  POST body:
    user object according to User Schema
    {
      user : {
        <fields>
      }
    }

  returns:
  {
    updated data
  }
*/
router.patch('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { user } = req.body;
    const updatedUser = await userService.updateUser(userId, user);
    res.status(200).json(updatedUser);
  } catch (error: any) {
    res.status(error.code || 500).json({ message: error.message });
  }
});


// gets all profile configs
router.get('/profile/all', async (req: Request, res: Response) => {
  try {
    const config = await profileService.getProfileConfigs();
    res.status(200).json(config);
  } catch (error: any) {
    res.status(error.code || 500).json({ message: error.message });
  }
});

/*
 updates profile, but if user does not have a profile, creates one
  POST body:
  profile picture schema
    {
      profile : {
        <fields>
      }
    }

  returns:
  {
    updated data
  }
*/
router.patch('/profile', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { profile } = req.body;
    const config = await profileService.updateProfile(userId, profile);
    res.status(200).json(config);
  } catch (error: any) {
    res.status(error.code || 500).json({ message: error.message });
  }
})

export { router as usersRouter };