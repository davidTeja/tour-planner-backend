const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const path = require("path");

const { connectDB } = require("./configuration/db.js");
const { PORT, NODE_ENV } = require("./configuration/config.js");
const tourRoutes = require("./routes/tour.routes.js");
const {
  wrongRouteHandler,
  globalErrorHandler,
} = require("./middlewares/errorHandler.js");

const app = express();
// Connect to Database
connectDB();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// API routes
app.use("/api/v1/", tourRoutes);

// Landing Page
if (NODE_ENV === "production") {
  // Serve static files from "public" folder in production
  const publicPath = path.join(__dirname, "public");
  app.use(express.static(publicPath));
} else {
  // For local development testing
  app.get("/", (req, res) => {
    res.send(
      `<h1>Welcome to Tour Planner!</h1>
     <a href="http://localhost:3000/Client/index.html">Let's Tour!</a>`
    );
  });
}

// Error handlers
app.use(wrongRouteHandler);
app.use(globalErrorHandler);

// Start server
app.listen(PORT, () => {
  if (NODE_ENV === "production") {
    console.log(`Server running on PORT:${PORT}`);
    return;
  }
  console.log(`Server running on http://localhost:${PORT}`);
});
