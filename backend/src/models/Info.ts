import mongoose from "mongoose";

const InfoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: [String],
  },
  fact: {
    type: String,
  },
});

const Info = mongoose.model("Info", InfoSchema);
export default Info;
