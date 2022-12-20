const mongoose = require("mongoose");

const status_schema  = new mongoose.Schema({
    Status : String,
    Networking : Number,
    ERC : Number,
    Core : Number,
    Interface : Number,
    Meta : Number,
    Informational : Number
})

const Status_model = new mongoose.model('status' , status_schema);

module.exports = Status_model;
