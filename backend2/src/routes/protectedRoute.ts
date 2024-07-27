import express, { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware';

const router: Router = express.Router();

// TODO: sample protected route using middleware, delete later
router.get('/', authMiddleware, (req, res) => {
  const { username } = req.user;
  res.status(200).json({
    status: 200,
    message: 'You are authorized to access this route.',
    username,
  });
});

export { router as protectedRouter };