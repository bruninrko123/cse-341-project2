const router = require("express").Router();


const serviceControllers = require("../controllers/services");

const { check, validationResult} = require("express-validator");

const validateService = [
    check("price").isNumeric().withMessage("Price must be a number")
]

const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", serviceControllers.getAllServices);

router.get("/:id", serviceControllers.getSingleService);

router.post("/", isAuthenticated, validateService,  serviceControllers.createService);

router.put("/:id", isAuthenticated, validateService, serviceControllers.updateService);

router.delete("/:id", isAuthenticated, serviceControllers.deleteService)



module.exports = router;