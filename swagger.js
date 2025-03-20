const swaggerAutogen = require("swagger-autogen");

const doc = {
    info: {
        title: "Employee API",
        description: "API that manages employees and their task"
    },
    host: "localhost:3020",
    schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const routes = ["./routes/index.js"];


swaggerAutogen(outputFile, routes, doc);