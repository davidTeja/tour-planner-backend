const mongoose = require("mongoose");

const tourSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, "ID is required"],
      trim: true,
      unique: true,
    },
    title: {
      type: String,
      trim: true,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      trim: true,
    },
    pick_up: {
      type: String,
      trim: true,
      required: [true, "Pick-up Location is required"],
    },
    meeting_point: {
      type: String,
      trim: true,
    },
    drop_off: {
      type: String,
      trim: true,
      required: [true, "Drop-off Location is required"],
    },
    duration: {
      type: Number,
      trim: true,
      required: [true, "Duration is required"],
    },
    duration_unit: {
      type: String,
      enum: ["Days", "Hours"],
      default: "Days",
    },
  },
  { timestamps: true }
);

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
