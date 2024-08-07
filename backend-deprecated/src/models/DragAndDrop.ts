import mongoose from "mongoose";
const { Schema } = mongoose;
import Question from './Question'; 


const DragAndDropSchema = new mongoose.Schema({
  content: {
    type: [Schema.Types.Mixed], // This allows an array of either strings or numbers
    required: true
  },
  draggable: {
    type: Map,
    of: Number,
    required: true
  }
});

const DragAndDrop = Question.discriminator("dnd", DragAndDropSchema);
export default DragAndDrop;
