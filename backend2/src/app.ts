import express from "express";
import { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';

import User from "./models/User";
import authMiddleware from "./middleware/authMiddleware";


const app: Application = express();


app.use(cors());
dotenv.config();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const PORT: number = 3000;
app.listen(PORT, async () => {
  console.log(`🗄️  Server Fire on http:localhost//${PORT}`);

  // Connect To The Database
  try {
    await mongoose.connect(
      process.env.DATABASE_URL as string
    );
    console.log("🛢️  Connected To Database");
  } catch (error) {
    console.log("⚠️ Error to connect Database");
  }
});




app.post("/auth/register", async (req, res) => {
  try {
    // ** Get The User Data From Body ;
    const user = req.body;

    // ** destructure the information from user;
    const { username, password } = user;

    const usernameAlreadyExists = await User.findOne({
      username: username,
    });

    if (usernameAlreadyExists) {
      res.status(400).json({
        status: 400,
        message: "Username all ready in use",
      });
       return;
    }


    // now create the user;
    const newUser = await User.create({
      username,
      password,
    });

    // Send the newUser as  response;
    res.status(200).json({
      status: 201,
      success: true,
      message: " User created Successfully",
      user: newUser,
    });
  } catch (error: any) {
    // console the error to debug
    console.log(error);

    // Send the error message to the client
    res.status(400).json({
      status: 400,
      message: error.message.toString(),
    });
  }
});



app.post("/auth/login", async (req, res) => {
  try {
    // ** Get The User Data From Body ;
    const user = req.body;

    // ** destructure the information from user;
    const { username, password } = user;

    // ** Check the (email/user) exist  in database or not ;
    const foundUser = await User.findOne({
      username: username,
    });

    // ** if there is not any user we will send user not found;
    if (!foundUser) {
      res.status(404).json({
        status: 404,
        success: false,
        message: "User not found",
      });
return;
    }

    const isPasswordMatched =
    foundUser?.password === password;

    // ** if not matched send response that wrong password;

    if (!isPasswordMatched) {
      res.status(400).json({
        status: 400,
        success: false,
        message: "wrong password",
      });
        return;
    }

    const JWT_SECRET = process.env.JWT_SECRET as string
    const token = jwt.sign(
      {
        id: foundUser?._id,
        username: user.username,
      },
      JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    // send the response
    res.status(200).json({
      status: 200,
      success: true,
      message: "login success",
      token: token,
    });
  } catch (error: any) {
    // Send the error message to the client
    res.status(400).json({
      status: 400,
      message: error.message.toString(),
    });
  }
});


app.get("/protectedRoute", authMiddleware, (req, res) => {
  // Check if req.user exists
  if (!req.user) {
    return res.status(401).json({
      status: 401,
      message: 'Unauthorized',
    });
  }

  // Destructure username from req.user
  const { username } = req.user;
  console.log(username);

  // Return only non-sensitive information
  res.status(200).json({
    username: username,
    message: 'You are authorized to access this route.',
  });
});