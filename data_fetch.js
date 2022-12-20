const express  = require('express');
const cors  = require('cors');
const fs = require('fs');
const dotenv = require("dotenv");
const path = require('path');
// const collection = require('./test');

let monthlyUpdate = {};

const {Eip_model ,status_schema} = require('./model/eipSchema');
const mongoose = require('mongoose');



const conn = mongoose.createConnection("mongodb+srv://admin-ritik:ritikapi21@cluster0.elbmwff.mongodb.net/eips", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err)=>{
    if(err)
    console.log(err);
    else
    console.log("eips DB connected");
});

const StatusModel = conn.model('status', status_schema);

function doit(){

StatusModel.find({} , (err,res)=>{
    if(err)
    console.log(err);
    else
    {
        let monthlyUpdate = (res);
        // console.log(monthlyUpdate);          
         
        return monthlyUpdate;
        // module.exports = monthlyUpdate;
    }
});

}

console.log(doit());

// function myreject()
// {
//     console.log("error");
// }

// const promise = new Promise( function(doit ,myreject)
// {
//     doit();
//     myreject();
// });
    


// promise.then(console.log(value));



