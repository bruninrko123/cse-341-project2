const mongoose = require("mongoose");

const Database = require("../data/database");
const Employee = require("../models/employee")

const getAllEmployees = async (req, res, next) => {
  try {
    
    
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    next(error);
  }
};





const createEmployee = async (req, res, next) =>{

    const {first_name, last_name, email, position, department, hire_date, salary, address} = req.body;


    try {
        const newEmployee = new Employee({
            first_name,
            last_name,
            email,
            position,
            department,
            hire_date,
            salary,
            address
        });

        await newEmployee.save();

        res.status(200).json(newEmployee);

    } catch (error) {  

        next(error)
        
    }
}

module.exports = {
    getAllEmployees,
    createEmployee
  };