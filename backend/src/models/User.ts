import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile: String,                    // Profile id
    history: String,                    // history id
    dailyStreakLastUpdateTime: Date,
    dailyStreakCount: Number,
    longestStreak: Number,
    lessons: [{                         // Lesson ids       
      type: String, 
    }],                 
  },
  { timestamps: true }
);

const User = mongoose.model("Users", UserSchema);
export default User;