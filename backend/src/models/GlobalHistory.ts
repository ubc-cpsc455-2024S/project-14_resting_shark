import mongoose from "mongoose";

const GlobalHistorySchema = new mongoose.Schema({
  lessons: [{                   // lesson of the day ids history
    type: String,
    }],
});

const GlobalHistory = mongoose.model("GlobalHistory", GlobalHistorySchema);
export default GlobalHistory;
