const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { connectDB } = require("./configuration/db.js");
const { PORT, NODE_ENV } = require("./configuration/config.js");
const tourRoutes = require("./routes/tour.routes.js");
const {
  wrongRouteHandler,
  globalErrorHandler,
} = require("./middlewares/errorHandler.js");

const app = express();
connectDB();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Welcome to Tour Planner!</h1>");
});
app.use("/api/v1/", tourRoutes);
app.use(wrongRouteHandler);
app.use(globalErrorHandler);

app.listen(PORT, () => {
  if (NODE_ENV === "production") {
    console.log(`Server running on PORT:${PORT}`);
    return;
  }
  console.log(`Server running on http://localhost:${PORT}`);
});
