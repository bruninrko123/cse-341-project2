
const mongoose = require("mongoose")
require("dotenv").config();



async function initializeDB(){

    const uri = process.env.URI;
    

    mongoose.connect(uri, {
       
    })
    .then(() => {
        console.log("connected to mongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB", err)
    })

    return 
}







module.exports = {
   
    initializeDB
}