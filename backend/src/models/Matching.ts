import mongoose from "mongoose";
import Question from "./Question";

const MultipleChoiceSchema = new mongoose.Schema({
    terms: {
        type: Map,
        of: Number,
        required: true,
    },
    definitions: {
        type: Map,
        of: Number,
        required: true,
    },
});

const MultipleChoice = Question.discriminator("matching", MultipleChoiceSchema);
export default MultipleChoice;