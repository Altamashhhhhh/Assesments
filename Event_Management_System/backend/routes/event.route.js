const express = require("express");
const eventModel = require("../models/event.model");
const authorization = require("../middlewares/authorization")
const eventRouter = express.Router();

eventRouter.post("/create-event", authorization(["admin"]) ,async (req, res) => {
  const { image , title, description, date, location } = req.body;
  try {
    const event = new eventModel({ image , title, description, date, location });
    await event.save();
    res
      .status(201)
      .json({ success: true, message: "Event created successfully.", event });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create event. Please try again later.",
      error: error.message,
    });
  }
});

eventRouter.get("/events", authorization(["admin" , "user"]) , async (req, res) => {
  try {
    const events = await eventModel.find();
    res
      .status(200)
      .json({
        success: true,
        message: "Events retrieved successfully.",
        events,
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch events. Please try again later.",
      error: error.message,
    });
  }
});
 
module.exports = eventRouter;
