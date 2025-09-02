import Todo from "../models/todo.model.js";

// Create todo
export const createTodo = async (req, res) => {
  try {
    const todo = new Todo({
      text: req.body.text,
      completed: req.body.completed || false,
      user: req.user._id,  // link todo to logged-in user
    });

    const newTodo = await todo.save();
    res.status(201).json({ newTodo });
  } catch (error) {
    res.status(500).json({ message: "Error creating todo" });
  }
};

// Fetch todos
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id }); // only this user’s todos
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todos" });
  }
};

// Update todo
export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },  // user must match
      req.body,
      { new: true }
    );

    if (!todo) return res.status(404).json({ message: "Todo not found" });

    res.json({ todo });
  } catch (error) {
    res.status(500).json({ message: "Error updating todo" });
  }
};

// Delete todo
export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,  // only delete if it belongs to user
    });

    if (!todo) return res.status(404).json({ message: "Todo not found" });

    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo" });
  }
};
