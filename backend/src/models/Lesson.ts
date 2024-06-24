import mongoose from "mongoose";

const LessonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  author: {                                     // userId
    type: String,
    required: true,
  },
  lives: {
    type: Number,
    required: true,
  },
  livesLastZeroTime: {                          // the timestamp of when the user's lives hit zero
    type: Date,
    required: true
  },
  streakCount: {
    type: Number,
    required: true
  },
  pageProgress: {                               // the furthest page the user has progressed to
    type: Number,
    required: true
  },
  highScore: {
    type: Number,
    required: true
  },
  currentScore: {                               // the current score of the user as they progress through the quiz score.
    type: Number,
    required: true
  },
  info: {                                       // Info id
    type: String,
    required: true
  },
  chapters: {                                   // Chapter ids
    type: [String],
    required: true
  }
});

const Lesson = mongoose.model("Lesson", LessonSchema);
export default Lesson;