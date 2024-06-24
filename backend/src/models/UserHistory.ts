import mongoose from "mongoose";

const UserHistorySchema = new mongoose.Schema({
  lessonHistory: [String], // LessonHistoryIds, update each time user completes a lesson
});


const UserHistory = mongoose.model("UserHistory", UserHistorySchema);
export default UserHistory;