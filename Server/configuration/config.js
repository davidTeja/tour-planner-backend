const dotenv = require("dotenv");

dotenv.config({
  path: `./.env.${process.env.NODE_ENV || "development"}.local`,
});

const { PORT, NODE_ENV, MONGO_URI } = process.env;
module.exports = { PORT, NODE_ENV, MONGO_URI };
