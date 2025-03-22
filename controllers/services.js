const Service = require("../models/service.js");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const {validationResult} = require("express-validator");

const getAllServices = async (req, res, next) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    next(error);
  }
};


const getSingleService = async (req, res, next) =>{

  if(!ObjectId.isValid(req.params.id)){
    res.status(400).json({error: "Must use a valid id to find an service"})
  }

  try {
    const serviceId = req.params.id;

    const service = await Service.findById(serviceId);

    if(!service){
      return res.status(404).json({error: "Service not found"})
    }

    res.status(200).json(service);
  } catch (error) {
    next(error);
  }
}

const createService = async (req, res, next) => {

  //validation
  const errors = validationResult(req);

    if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.array()});
    }


    const {service_name, category, description, duration, price} = req.body;
    
    try {
        const newService = new Service({
            service_name,
            category,
            description,
            duration,
            price 
        })

        await newService.save();

        res.status(200).json(newService);

  } catch (error) {
    next(error);
  }
};

const updateService = async(req, res, next) =>{


   //validation
   const errors = validationResult(req);

   if(!errors.isEmpty()){
     return res.status(400).json({errors: errors.array()});
   }

  if(!ObjectId.isValid(req.params.id)){
    res.status(404).json({error: "Must use a valid id to update a service"});
  }

  try{

    const serviceId = req.params.id;

    const updatedService = await Service.findByIdAndUpdate(serviceId, req.body, {new: true});
    
    if(!updatedService){
      return res.status(404).json({error: "something went wrong with updating the service"})
    }
    return res.status(200).json(updatedService);
  } catch(error){
    next(error);
  }
}


const deleteService = async(req, res, next) =>{
  if(!ObjectId.isValid(req.params.id)){
    res.status(404).json({error: "Must use a valid ID to delete a service"});
  }

  try {
    const serviceId = req.params.id;

    const deletedService = await Service.findByIdAndDelete(serviceId);

    if(!deletedService){
      return res.status(404).json({ error: "Service not found"})
    }

    return res.status(200).json({
      message: "Service deleted successfully",
      deletedService,
    });
    }
   catch (error) {
    next(error);
  }
}

module.exports = {
  getAllServices,
  createService,
  getSingleService,
  updateService,
  deleteService
};
