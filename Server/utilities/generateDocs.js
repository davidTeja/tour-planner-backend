// generateDocs.js
const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Tour Planner API",
    description:
      "Automatically generated API documentation for the Tour Planner backend.",
    version: "1.0.0",
  },
  host: "tour-planner-backend.onrender.com",
  schemes: ["https"],
};

const outputFile = "./swagger_output.json";
const endpointsFiles = [
  "./Server/routes/tour.routes.js", // add other route files here if you have them
];

swaggerAutogen(outputFile, endpointsFiles, doc);
console.log("Swagger documentation generated successfully.");
