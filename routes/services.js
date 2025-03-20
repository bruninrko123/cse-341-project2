const router = require("express").Router();


const serviceControllers = require("../controllers/services");

router.get("/", serviceControllers.getAllServices);

router.post("/", serviceControllers.createService);

module.exports = router;