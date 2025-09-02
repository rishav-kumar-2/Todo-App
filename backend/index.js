import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import todoRoute from "./routes/todo.route.js";
import userRoute from "./routes/user.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// trust proxy (needed for cookies to work correctly with CORS)
app.set("trust proxy", 1);

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// connect db
connectDB();

// routes
app.use("/todo", todoRoute);
app.use("/user", userRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
