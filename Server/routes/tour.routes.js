const router = require("express").Router();

const {
  getTours,
  createTour,
  getToursById,
  updateTourById,
  deleteTour,
} = require("../controllers/tour.controllers.js");

router.get("/", (req, res) => {
  res.status(200).json({
    message: "API is running. To fetch tours, go to /api/v1/tours",
  });
});

router.get("/tours", getTours);
router.get("/get-tour/:id", getToursById);
router.post("/create-tour", createTour);
router.put("/update-tour/:id", updateTourById);
router.delete("/delete-tour/:id", deleteTour);

module.exports = router;
