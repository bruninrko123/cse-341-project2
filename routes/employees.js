
const router = require("express").Router();


const employeesController = require("../controllers/employees");
const { validate } = require("../models/service");
const { check, validationResult} = require("express-validator");
const validateEmployee = [
    check("email").isEmail().withMessage("invalid email format"),
    check("salary").isNumeric().withMessage("Salary must be a number")
];

router.get("/", employeesController.getAllEmployees)

router.get("/:id", employeesController.getSingleEmployee)

router.post("/",validateEmployee, employeesController.createEmployee)

router.put("/:id",validateEmployee, employeesController.updateEmployee)

router.delete("/:id", employeesController.deleteEmployee)

module.exports = router;