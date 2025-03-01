const express = require("express");
const enrollmentModel = require("../models/enroll.model");

const enrollRouter = express.Router();

enrollRouter.post("/enroll-event", async (req, res) => {
  const { user, event } = req.body;

  if (!user || !event) {
    return res.status(400).json({
      success: false,
      message: "User ID and Event ID are required.",
    });
  }

  try {
    const alreadyEnrolled = await enrollmentModel.findOne({ user, event });
    if (alreadyEnrolled) {
      return res.status(409).json({
        success: false,
        message: "You are already enrolled in this event.",
      });
    }

    const enrolled = new enrollmentModel({ user, event });
    await enrolled.save();

    res.status(201).json({
      success: true,
      message: "Enrollment successful.",
      enrollment: enrolled,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to process enrollment. Please try again later.",
      error: error.message,
    });
  }
});

enrollRouter.get("/enrollments/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const enrollments = await enrollmentModel
      .find({ user: userId })
      .populate("event", "title date image")
      .populate("user", "name email");

    res.status(200).json({
      success: true,
      message: "User enrollments retrieved successfully.",
      enrollments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching enrollments.",
      error: error.message,
    });
  }
});

enrollRouter.get("/event/:eventId", async (req, res) => {
  const { eventId } = req.params;
  try {
    const enrolled = await enrollmentModel
      .find({ event: eventId })
      .populate("user", "name email");
    const users = enrolled.map((enroll) => enroll.user);

    res.status(200).json({ success: true, users });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching users list",
      error: error.message,
    });
  }
});

enrollRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const isExist = await enrollmentModel.findOne({_id : id})
    if(!isExist){
      return res.status(404).json({message : "enrollment not found , either Provided id is wrong or try again later  "})
    }
    const deleted = await enrollmentModel.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "Enrollment is delete successfull", data: deleted });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "An error occured while delete the enrollment",
        error: error.message,
      });
  }
});

module.exports = enrollRouter;
