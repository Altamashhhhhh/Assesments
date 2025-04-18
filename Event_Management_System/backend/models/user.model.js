const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
    required: true,
    trim: true,
  },
  password: { type: String, required: true, trim: true },
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
