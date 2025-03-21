const router = require("express").Router();


const serviceControllers = require("../controllers/services");

router.get("/", serviceControllers.getAllServices);

router.get("/:id", serviceControllers.getSingleService);

router.post("/", serviceControllers.createService);

router.put("/:id", serviceControllers.updateService);

router.delete("/:id", serviceControllers.deleteService)



module.exports = router;