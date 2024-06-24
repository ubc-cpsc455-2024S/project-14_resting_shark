import mongoose from "mongoose";


const ChaptersSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        info: {                         // Info id
            type: String,
            required: true,
        },
        questions: {
            type: [String],
            required: true,
        }
    }
);

const Chapters = mongoose.model("Chapters", ChaptersSchema);
export default Chapters;
