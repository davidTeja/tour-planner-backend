const mongoose = require("mongoose");

const tourSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, "ID is required"],
      unique: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      minLength: [5, "Description must be at least 5 characters long"],
    },
    pick_up: {
      type: String,
      required: [true, "Pick-up Location is required"],
    },
    meeting_point: {
      type: String,
    },
    drop_off: {
      type: String,
      required: [true, "Drop-off Location is required"],
    },
    duration: {
      type: Number,
      required: [true, "Duration is required"],
    },
    duration_unit: {
      type: String,
      required: [true, "Duration Unit is required"],
      enum: ["Days", "Hours"],
      default: "Days",
    },
  },
  { timestamps: true }
);

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
