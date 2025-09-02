// @ts-nocheck
import User from "../models/user.model.js";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { generateTokenAndSaveInCookies } from "../jwt/token.js";

const userSchema = z.object({
  email: z.string().email("Invalid email address"),
  username: z.string().min(3, "Username must be at least 3 characters long"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const validation = userSchema.safeParse({ email, username, password });
    if (!validation.success) {
      const errorMessage = validation.error.errors.map((err) => err.message);
      return res.status(400).json({ message: errorMessage });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, username, password: hashedPassword });
    await newUser.save();

    if (newUser) {
      const token = await generateTokenAndSaveInCookies(newUser._id, res);
      return res
        .status(201)
        .json({ message: "User registered successfully", newUser, token });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error registering user" });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

   
    const token = await generateTokenAndSaveInCookies(user._id, res);

    res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in user" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("jwt", {
      path: "/",
    });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error logging out user" });
  }
};
