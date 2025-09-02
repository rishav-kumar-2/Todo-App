

import express from "express";
import { authenticate } from "../middleware/authorize.js";
import { createTodo, getTodos, updateTodo, deleteTodo } from "../controllers/todo.controller.js";

const router = express.Router();

router.post("/create", authenticate, createTodo);
router.get("/fetch", authenticate, getTodos);
router.put("/update/:id", authenticate, updateTodo);
router.delete("/delete/:id", authenticate, deleteTodo);

export default router;
