const express = require("express");
const eventModel = require("../models/event.model");
const authorization = require("../middlewares/authorization");
const eventRouter = express.Router();

eventRouter.post(
  "/create-event",
  authorization(["admin"]),
  async (req, res) => {
    const { image, title, description, date, location } = req.body;
    try {
      const event = new eventModel({
        image,
        title,
        description,
        date,
        location,
      });
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
  }
);

eventRouter.get(
  "/events",
  authorization(["admin", "user"]),
  async (req, res) => {
    try {
      let { page, limit, search } = req.query;
      const query = {};
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          { location: { $regex: search, $options: "i" } },
          { date: { $regex: search, $options: "i" } },
        ];
      }

      page = parseInt(page) || 1;
      limit = parseInt(limit) || 8;
      const skip = (page - 1) * limit;

      const events = await eventModel.find(query).skip(skip).limit(limit);
      const totalEvents = await eventModel.countDocuments(query);
      res.status(200).json({
        success: true,
        message: "Events retrieved successfully.",
        events,
        pagination: {
          totalEvents,
          totalPages: Math.ceil(totalEvents / limit),
          limit,
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch events. Please try again later.",
        error: error.message,
      });
    }
  }
);

module.exports = eventRouter;
