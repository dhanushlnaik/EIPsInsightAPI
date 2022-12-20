
const express  = require('express');
const cors  = require('cors');

const {Eip_model , status_schema} = require('./model/eipSchema');
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://admin-ritik:ritikapi21@cluster0.elbmwff.mongodb.net/eipsdata" ,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const eip_data = require("./past_data");

setTimeout( update , 1000);


function update()
{
    console.log(eip_data);
    console.log(Object.keys(eip_data).length);
   for(let data in eip_data)
   { 

    if(data != undefined){

        Eip_model.find({"eip" : data} , (err ,res)=>{
            if(err)
            console.log(err);
            else if(res.length == 0)
            {
                const eip_doc = new Eip_model({
    
                    eip : data,
                    type : eip_data[data].type,
                    category : eip_data[data].category,
                    status : eip_data[data].status
            
                })
            
                eip_doc.save((err)=>{
                    if(err)
                    console.log(err);
                    else
                    console.log("pc");
                });
            }
            
        });
    
   

   }
   
   }

}



