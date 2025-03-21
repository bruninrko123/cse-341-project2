
const router = require("express").Router();


const employeesController = require("../controllers/employees")

router.get("/", employeesController.getAllEmployees)

router.get("/:id", employeesController.getSingleEmployee)

router.post("/", employeesController.createEmployee)

router.put("/:id", employeesController.updateEmployee)

router.delete("/:id", employeesController.deleteEmployee)

module.exports = router;