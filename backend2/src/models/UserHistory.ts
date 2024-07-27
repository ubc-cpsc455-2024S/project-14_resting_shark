import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const UserHistorySchema = new mongoose.Schema({
  lessonHistory: [{ 
    type: ObjectId, 
    ref: 'Lesson'
  }]
});



const UserHistory = mongoose.model("UserHistory", UserHistorySchema);
export default UserHistory;