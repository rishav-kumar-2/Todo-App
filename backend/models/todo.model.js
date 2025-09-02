import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",   // link todo to user
    required: true,
  },
});

const Todo = mongoose.model("Todo", todoSchema);
export default Todo;
