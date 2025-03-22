const router = require("express").Router();


const serviceControllers = require("../controllers/services");

const { check, validationResult} = require("express-validator");

const validateService = [
    check("price").isNumeric().withMessage("Price must be a number")
]

router.get("/", serviceControllers.getAllServices);

router.get("/:id", serviceControllers.getSingleService);

router.post("/",validateService,  serviceControllers.createService);

router.put("/:id",validateService, serviceControllers.updateService);

router.delete("/:id", serviceControllers.deleteService)



module.exports = router;