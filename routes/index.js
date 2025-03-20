const routes = require("express").Router();


routes.get("/", (req, res) =>{ res.send("Hello world!")});


routes.use("/employees", require("./employees"));

routes.use("/services", require("./services"));

module.exports = routes;