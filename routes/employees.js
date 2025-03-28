
const router = require("express").Router();


const employeesController = require("../controllers/employees");
const { validate } = require("../models/service");
const { check, validationResult} = require("express-validator");
const validateEmployee = [
    check("email").isEmail().withMessage("invalid email format"),
    check("salary").isNumeric().withMessage("Salary must be a number")
];


const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", employeesController.getAllEmployees)

router.get("/:id", employeesController.getSingleEmployee)

router.post("/" ,isAuthenticated ,validateEmployee, employeesController.createEmployee)

router.put("/:id" ,isAuthenticated,validateEmployee, employeesController.updateEmployee)

router.delete("/:id", isAuthenticated, employeesController.deleteEmployee)

module.exports = router;