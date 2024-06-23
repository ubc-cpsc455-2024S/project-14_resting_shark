import express from "express";
import { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";

import { authRouter } from './routes/auth';
import { protectedRouter } from "./routes/protectedRoute";
import { connectDB } from "./db/mongoConnection";


const app: Application = express();

// middleware
app.use(cors());
dotenv.config();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// routes
app.use('/auth', authRouter);
app.use('/protected', protectedRouter);

// server port
const PORT: number = 3000;
app.listen(PORT, async () => {
  console.log(`App listening on port ${PORT}`);

  try {
    connectDB();
    console.log("Connected To Database");
  } catch (error) {
    console.error(error);
  }
});