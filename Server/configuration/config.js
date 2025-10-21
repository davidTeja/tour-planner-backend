const dotenv = require("dotenv");

// I'm accessing env before even loading the file, hence NODE_ENV is undefined
dotenv.config({
  path: `./.env.${process.env.NODE_ENV || "development"}.local`,
});

// console.log("Current Environment:", process.env.NODE_ENV);

const { PORT, NODE_ENV, MONGO_URI } = process.env;
module.exports = { PORT, NODE_ENV, MONGO_URI };

// NODE_ENV are set per session in powershell unlike in cmd.
// command to set the env explicitly in powershell:  $env:NODE_ENV="development"
