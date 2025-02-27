const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const userRouter = express.Router();

userRouter.get("/users",  async (req, res) => {
  try {
    const users = await userModel.find().select("-password");
    res
      .status(200)
      .json({ success: true, message: "Users retrieved successfully.", users });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch users. Please try again later.",
      error: error.message,
    });
  }
});

userRouter.post("/register", async (req, res) => {
  const { name, email, role, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "This email is already registered. Please log in.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new userModel({ name, email, role, password: hashedPassword });
    await user.save();

    res.status(201).json({
      success: true,
      message: "User account created successfully.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to register user. Please try again later.",
      error: error.message,
    });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email. Please sign up.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password. Please try again.",
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful. Welcome back!",
      token,
      user
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Login request failed. Please try again later.",
      error: error.message,
    });
  }
});

module.exports = userRouter;
