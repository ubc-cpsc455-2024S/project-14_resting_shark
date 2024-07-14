import mongoose from "mongoose";
import Question from "./Question";

const MatchingChoiceSchema = new mongoose.Schema({
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

const Matching = Question.discriminator("matching", MatchingChoiceSchema);
export default Matching;