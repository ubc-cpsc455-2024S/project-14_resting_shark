import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["mc", "dnd", "matching"],
      required: true,
    },
  },
  { discriminatorKey: "type" }
);

const Question = mongoose.model("Question", QuestionSchema);
export default Question;
