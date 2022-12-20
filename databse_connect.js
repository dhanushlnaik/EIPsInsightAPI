const express  = require('express');
const cors  = require('cors');
const mongoose = require("mongoose");
mongoose.connect("mongodb://143.244.213.59:27017/eipsdata" ,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) =>{
    if(err)
    console.log(err);
    else
    {
        console.log("yearly DB1 connected ");
    }
});