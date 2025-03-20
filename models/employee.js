const mongoose = require("mongoose");



const employeeSchema = new mongoose.Schema({

    
    first_name : {type: String, required: true},
    
    last_name: {type: String, required: true},
    
    email: {type: String, required: true, unique: true},
    
    position: {type: String, required: true},
    
    department: {type: String, required: true},
    
    hire_date: {type: Date, required: true},
    
    salary: {type: Number, required: true},
    
    
    address:
    {
    
    street: {type: String, required: true},
    
    city: {type: String, required: true},
    
    state: {type: String, required: true},
    
    postal_code: {type: String, required: true}
    
    },
    });
    
    
    const Employee = mongoose.model("Employee", employeeSchema);


    module.exports = Employee;