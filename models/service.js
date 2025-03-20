const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({

    service_name : {type: String, required: true},

    category: {type: String, required: true},

    description: {type: String, required: true},

    duration: {type: String, required: true},

    price: {type: String, required: true}

});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;

