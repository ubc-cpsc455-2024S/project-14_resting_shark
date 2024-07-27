import mongoose from "mongoose";
import Question from "./Question";

const MultipleChoiceSchema = new mongoose.Schema({
  question: {
    String
  },
    options: {
        type: Map,
        of: Boolean,
        required: true,
    },
});


const MultipleChoice = Question.discriminator("matching", MultipleChoiceSchema);
export default MultipleChoice;