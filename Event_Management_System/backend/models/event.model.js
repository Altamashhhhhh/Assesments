const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  image: {
    type: String,
    trim: true,
    default:
      "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg",
  },
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  date: { type: Date, default: Date.now },
  location: { type: String, required: true, trim: true },
});

const eventModel = mongoose.model("Event", eventSchema);
module.exports = eventModel;
