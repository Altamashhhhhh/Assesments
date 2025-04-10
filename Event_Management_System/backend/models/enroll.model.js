const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
});

const enrollmentModel = mongoose.model("Enrollment", enrollmentSchema);

module.exports = enrollmentModel;
