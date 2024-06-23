import express, { Router } from 'express';
import authService from '../services/authService';

const router: Router = express.Router();

// user registration
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    const result = await authService.registerUser(username, password);
    res.status(201).json(result);

  } catch (error: any) {
    res.status(400).json({
      status: 400,
      message: error.message.toString(),
    });
  }
});

// user login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const token = await authService.loginUser(username, password);

    res.status(200).json({token: token});
  } catch (error: any) {
    res.status(400).json({
      status: 400,
      message: error.message.toString(),
    });
  }
});

export { router as authRouter };
