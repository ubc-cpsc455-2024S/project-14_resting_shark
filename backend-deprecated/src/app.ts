import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import { authRouter } from "./routes/auth";
import { protectedRouter } from "./routes/protectedRoute";
import { lessonsRouter } from "./routes/lesson";
import { usersRouter } from "./routes/user";
import { connectDB } from "./db/mongoConnection";

const app = express();

// middleware
app.use(cors());
dotenv.config();
app.use(express.json());
app.use(bodyParser.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// routes
app.use("/auth", authRouter);
app.use("/protected", protectedRouter);
app.use("/lesson", lessonsRouter);
app.use("/user", usersRouter);

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
