import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// adds user field to Request
declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}

// authentication middleware
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      status: 401,
      message: 'Access denied. No token provided.',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded; 
    next(); 
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: 'Invalid token.',
    });
  }
};


export default authMiddleware;
