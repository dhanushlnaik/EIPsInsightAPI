const express  = require('express');
const cors  = require('cors');
const {Eip_model ,status_schema} = require('./model/eipSchema');
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://admin-ritik:ritikapi21@cluster0.elbmwff.mongodb.net/eips" ,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err)=>{
    if(err)
    console.log(err);
    else
    console.log("eips DB connected");
});

const StatusModel = new mongoose.model('status-eipinfo' , status_schema);

let statusEIP = ['Final','Draft','Review','Last_Call','Stagnant','Withdrawn','Living' ];
let categoryEIP = ['Networking','ERC','Core','Interface','Meta', 'Informational'];


for(let st of statusEIP)
{
    const doc = new StatusModel({
        Year : "2022",
        Month : "November", 
        Status : st,
        Networking : [0, "eip-23"],
        ERC : [0, "eip-23"],
        Core : [0, "eip-23"],
        Interface : [0, "eip-23"],
        Meta : [0, "eip-23"],
        Informational : [0, "eip-23"]
    })

    doc.save((err)=>{
        if(err)
        console.log(err);
        else
        console.log("saved");
    })
}
                





