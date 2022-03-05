import { Schema, model } from "mongoose";
import { ObjectId } from "mongodb";

const schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  id: ObjectId,
});

export default model("todo", schema);
