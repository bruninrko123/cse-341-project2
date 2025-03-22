const mongoose = require("mongoose");

const Database = require("../data/database");
const Employee = require("../models/employee")
const {validationResult} = require("express-validator");
const ObjectId = mongoose.Types.ObjectId;

const getAllEmployees = async (req, res, next) => {
  try {
    
    
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    next(error);
  }
};


const getSingleEmployee = async (req, res, next) =>{

  if(!ObjectId.isValid(req.params.id)){
    res.status(400).json({error: "Must use a valid id to find an employee"})
  }

  try{
  const employeeId = req.params.id;

  const employee = await Employee.findById(employeeId);

  if(!employee){
    return res.status(404).json({error: "Employee not found"})
  }

  res.status(200).json(employee);
  } catch(error){
    next(error);
  }

}


const createEmployee = async (req, res, next) =>{

    //validation
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.array()});
    }


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



const updateEmployee = async(req, res, next) =>{

  //validation
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }

  if(!ObjectId.isValid(req.params.id)) {
    res.status(404).json({error: "Must use a valid id to update an employee"});
  }

  try{
  const employeeId = req.params.id;

  const updatedEmployee = await Employee.findByIdAndUpdate(employeeId, req.body, {new: true});

  if(!updatedEmployee){
    return res.status(404).json({error: "something went wrong with updating the employee"})
  }
  res.status(200).json(updatedEmployee)
} catch(errror){
  next(error);
}
}



const deleteEmployee = async(req, res, next) =>{

  if(!ObjectId.isValid(req.params.id)){
    res.status(404).json({error: "Must use a valid ID to delete an employee"});
  }

  try{
    const employeeId = req.params.id;

    const deletedEmployee =  await Employee.findByIdAndDelete(employeeId);

    if(!deletedEmployee){
      return res.status(404).json({ error: "Employee not found"})
    }

   return res.status(200).json({
      message: "Employee deleted successfully",
      deletedEmployee,
    });
  } catch(error){
    next(error);
  }
};

module.exports = {
    getAllEmployees,
    createEmployee,
    updateEmployee,
    getSingleEmployee,
    deleteEmployee
  };