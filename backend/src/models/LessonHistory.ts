import mongoose from "mongoose";

const LessonHistorySchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        },
    lessonId: String,
    timestamp: Date,
});


const LessonHistory = mongoose.model("LessonHistory", LessonHistorySchema);
export default LessonHistory;