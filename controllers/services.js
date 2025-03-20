const Service = require("../models/service.js");

const getAllServices = async (req, res, next) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    next(error);
  }
};

const createService = async (req, res, next) => {
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

module.exports = {
  getAllServices,
  createService
};
