import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const GlobalHistorySchema = new mongoose.Schema({
  lessons: [{                   // lesson of the day ids history
    type: ObjectId,
    ref: "Lesson",
    }],
});

const GlobalHistory = mongoose.model("GlobalHistory", GlobalHistorySchema);
export default GlobalHistory;
