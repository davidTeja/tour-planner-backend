const router = require("express").Router();

const {
  getTours,
  createTour,
  getToursById,
} = require("../controllers/tour.controllers.js");

router.get("/", (req, res) => {
  res.send("<h1>Tours</h1>");
});

router.get("/tours", getTours);
router.get("/tours/:id", getToursById);
router.post("/tours", createTour);
// router.put("/tours/:id");
// router.delete("/tours/:id");

module.exports = router;
