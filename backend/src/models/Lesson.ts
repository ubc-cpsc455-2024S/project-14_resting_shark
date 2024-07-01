import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const LessonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  author: {                                     // userId
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  lives: {
    type: Number,
    required: true,
  },
  livesLastZeroTime: {                          // the timestamp of when the user's lives hit zero
    type: Date,
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
  info: {    
    type: ObjectId,                              // Info id
    ref: 'Info'                                 
  },
  chapters: {                                   // Chapter ids
    type: [{
      type: ObjectId,
      ref: "Chapters"
    }],
  }
});

const Lesson = mongoose.model("Lesson", LessonSchema);
export default Lesson;