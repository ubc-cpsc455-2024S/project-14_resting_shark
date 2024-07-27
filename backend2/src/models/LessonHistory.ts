import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const LessonHistorySchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: "User",
        required: true,
        },
    lessonId: {
      type: ObjectId,
      ref: "Lesson",
      required: true,
    },
    timestamp: Date,
});


const LessonHistory = mongoose.model("LessonHistory", LessonHistorySchema);
export default LessonHistory;