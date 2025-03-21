const express = require("express");

const createError = require("http-errors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const port = 3020;
const { initializeDB } = require("./data/database");
app.use(express.json());
app.use("/", require("./routes"));



//swagger route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//404 handler
app.use((req, res, next) => {
  // res.status(404).json({error: "Route not found"});

  next(createError(404, "Route not found"));
});

//error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});




app.listen(port, () => {
  initializeDB();
  console.log(`Listening on port ${port}`);
});
