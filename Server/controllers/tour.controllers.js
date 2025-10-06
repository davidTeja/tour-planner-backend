const Tour = require("../models/tour.model.js");
const idGenerator = require("../utilities/idGenerator.js");
// for fetch all tours button
exports.getTours = async (req, res) => {
  try {
    const tours = await Tour.find().lean();
    if (tours.length === 0) {
      console.error("No tours found!");
      return res.status(404).json({ message: "No tours found." });
    }
    res.status(200).json(tours);
    console.log("Tours fetched successfully.");
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.error({ error: err.message }, { stack: err.stack });
  }
};

// save tour button
exports.createTour = async (req, res) => {
  try {
    // Destructuring creates local variables —
    // changing them does not change the original object (req.body) unless you explicitly update it.
    let {
      title,
      pick_up,
      drop_off,
      description,
      meeting_point,
      duration,
      duration_unit,
    } = req.body;

    console.log(req.body);

    //  validating body
    if (!req.body) {
      console.error("No tour data provided.");
      return res.status(400).json({ message: "No tour data provided." });
    }

    // prevents numeric garbage data
    if (
      !isNaN(title) ||
      !isNaN(description) ||
      !isNaN(pick_up) ||
      !isNaN(meeting_point) ||
      !isNaN(drop_off)
    ) {
      console.error("Invalid tour data provided.");
      return res.status(400).json({
        message:
          "Invalid tour data provided. Don't just drop numbers anywhere!",
      });
    }
    // generating custom id
    req.body.id = idGenerator();
    // inserting fields ignored by Mongoose
    // because they were set to undefined to fail numeric checks
    if (!description) req.body.description = "N/A";
    if (!meeting_point) req.body.meeting_point = "N/A";

    const tour = await Tour.create(req.body);
    res.status(201).json(tour);
    console.log("Tour created successfully.");
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.error({ error: err.message }, { stack: err.stack });
  }
};

exports.getToursById = async (req, res) => {
  try {
    const tourId = req.params.id;
    // const tour = await Tour.findById(tourId).lean();
    const tour = await Tour.findOne({ id: tourId }).lean();
    if (!tour) {
      console.error("Tour not found! ");
      return res.status(404).json({ message: "Tour not found." });
    }
    res.status(200).json(tour);
    console.log("Tour fetched successfully.");
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.error({ error: err.message }, { stack: err.stack });
  }
};

exports.updateTourById = async (req, res) => {
  try {
    let {
      title,
      pick_up,
      drop_off,
      description,
      meeting_point,
      duration,
      duration_unit,
    } = req.body;

    // preventing numeric garbage
    if (
      !isNaN(title) ||
      !isNaN(description) ||
      !isNaN(pick_up) ||
      !isNaN(meeting_point) ||
      !isNaN(drop_off)
    ) {
      console.error("Invalid tour data provided.");
      return res.status(400).json({
        message:
          "Invalid tour data provided. Don't just drop numbers anywhere!",
      });
    }
    const { id } = req.params;
    // validating body
    if (!req.body) {
      console.error("No tour data provided.");
      return res.status(400).json({ message: "No tour data provided." });
    }
    const tour = await Tour.findOneAndUpdate({ id }, req.body, {
      new: true,
    });
    if (!tour) {
      console.error("Tour not found! Enter Id correctly.");
      return res.status(404).json({ message: "Tour not found." });
    }

    console.log(tour);
    res.status(200).json(tour);
    console.log("Tour updated successfully.", id, req.body.title);
  } catch (err) {
    console.error({ error: err.message }, { stack: err.stack });
    res.status(400).json({ message: err.message });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await Tour.findOneAndDelete({ id });
    if (!tour) {
      console.error("Tour not found! Enter Id correctly.");
      return res.status(404).json({ message: "Tour not found." });
    }
    console.log("Tour deleted successfully.", id);
    res.status(200).json(tour);
  } catch (err) {
    console.error({ error: err.message }, { stack: err.stack });
    res.status(400).json({ message: err.message });
  }
};
