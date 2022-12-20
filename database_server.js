const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
// const StatusModel  = require( "model/statusSchema.js" );  

const fetch  = require( "node-fetch" );

mongoose.connect("mongodb+srv://admin-ritik:ritikapi21@cluster0.elbmwff.mongodb.net/eips" ,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let monthlyUpdate = {
   
    StatusWise : []
};


// const app = express();


// const standardTrackSchema = new mongoose.Schema({
//     Networking : Number,
//     ERC : Number,
//     Core : Number,
//     Interface : Number
// })

const status_schema  = new mongoose.Schema({
    Status : String,
    Networking : Number,
    ERC : Number,
    Core : Number,
    Interface : Number,
    Meta : Number,
    Informational : Number
})

const StatusModel = new mongoose.model('status' , status_schema);


const final = new StatusModel({
    Status : "Final",
    Networking : 0,
    ERC : 0,
    Core : 0,
    Interface : 0,
    Meta : 0,
    Informational : 0
});
// final.save( (err) => {
//     if(err) console.log(err);
//     else
//     console.log("saved");
// })



const draft = new StatusModel({
    Status : "Draft",
    Networking : 0,
    ERC : 0,
    Core : 0,
    Interface : 0,
    Meta : 0,
    Informational : 0
});
// draft.save( (err) => {
//     if(err) console.log(err);
//     else
//     console.log("saved");
// })

const review = new StatusModel({
    Status : "Review",
    Networking : 0,
    ERC : 0,
    Core : 0,
    Interface : 0,
    Meta : 0,
    Informational : 0
});
// review.save( (err) => {
//     if(err) console.log(err);
//     else
//     console.log("saved");
// })

const last_call = new  StatusModel({
    Status : "Last_Call",
    Networking : 0,
    ERC : 0,
    Core : 0,
    Interface : 0,
    Meta : 0,
    Informational : 0
});
// last_call.save( (err) => {
//     if(err) console.log(err);
//     else
//     console.log("saved");
// })

const stagnant = new  StatusModel({
    Status : "Stagnant",
    Networking : 0,
    ERC : 0,
    Core : 0,
    Interface : 0,
    Meta : 0,
    Informational : 0
});

// stagnant.save( (err) => {
//     if(err) console.log(err);
//     else
//     console.log("saved");
// })

const withdrawn = new StatusModel({
    Status : "Withdrawn",
    Networking : 0,
    ERC : 0,
    Core : 0,
    Interface : 0,
    Meta : 0,
    Informational : 0
});

// withdrawn.save( (err) => {
//     if(err) console.log(err);
//     else
//     console.log("saved");
// })

const living = new  StatusModel({
    Status : "Living",
    Networking : 0,
    ERC : 0,
    Core : 0,
    Interface : 0,
    Meta : 0,
    Informational : 0
});

// living.save( (err) => {
//     if(err) console.log(err);
//     else
//     console.log("saved");
// })


const eipschema =  new mongoose.Schema({
    Type_api : String ,
    Networking : Number,
    ERC : Number,
    Interface : Number,
    Core : Number,
    Meta : Number,
    Standard_Track : Number,
    Informational : Number
})

const EIPSdata = new mongoose.model("Eip" , eipschema);

let ref = {
    
    Networking : 13,
    ERC : 256,
    Interface : 42,
    Core :189,
    Meta : 18,
    Standard_Track : 500,
    Informational : 6
}

let refStatus = {
    
 Final: {
    "Standard_Track": {
       "Networking": 9,
       "ERC": 36,
       "Core": 47,
       "Interface": 8
    },

    "Meta": 10,
    "Informational": 2

    },

 Draft: {
    "Standard_Track": {
      "Networking": 2,
      "ERC": 84,
      "Core": 27,
      "Interface": 3
    },

    "Meta": 0,
    "Informational": 0
    },

Review: {
    "Standard_Track": {
      "Networking": 1,
      "ERC": 24,
      "Core": 10,
      "Interface": 0
    },

    "Meta": 0,
    "Informational": 0
    },

Last_Call: {
    "Standard_Track": {
    "Networking": 1,
    "ERC": 8,
    "Core": 0,
    "Interface": 1
    },

    "Meta": 0,
    "Informational": 0
    },

Stagnant: {
    "Standard_Track": {
    "Networking": 0,
    "ERC": 99,
    "Core": 87,
    "Interface": 29
    },

    "Meta": 7,
    "Informational": 2
    },

Withdrawn: {
    "Standard_Track": {
    "Networking": 0,
    "ERC": 5,
    "Core": 18,
    "Interface": 1
    },

    "Meta": 0,
    "Informational": 1
    },

Living: {

    "Standard_Track": {
    "Networking": 0,
    "ERC": 0,
    "Core": 0,
    "Interface": 0
    },

    "Meta": 1,
    "Informational": 1
    } 
}

// console.log(refStatus.Review.Standards_Track.Networking);


let obj = {};
let objStatus = {};

// fetch('https://eipsinsight.com/api/overallData')
// .then(response => response.json())
// .then(obj => console.log(obj));


 let newN =0 , newE = 0 , newInter =0 , newC = 0, newM =0 , newS =0 , newInfo =0 ;
 let newFSN=0, newFSE=0 , newFSC =0  , newFSI =0 , newFM =0, newFInfo =0 ;
 let newDSN=0, newDSE=0 , newDSC =0  , newDSI =0 , newDM =0, newDInfo =0 ;
 let newRSN=0, newRSE=0 , newRSC =0  , newRSI =0 , newRM =0, newRInfo =0 ;
 let newLSN=0, newLSE=0 , newLSC =0  , newLSI =0 , newLM =0, newLInfo =0 ;
 let newSSN=0, newSSE=0 , newSSC =0  , newSSI =0 , newSM =0, newSInfo =0 ;
 let newWSN=0, newWSE=0 , newWSC =0  , newWSI =0 , newWM =0, newWInfo =0 ;
 let newLiSN=0, newLiSE=0 , newLiSC =0  , newLiSI =0 , newLiM =0, newLiInfo =0 ; 
 let statusObjID  ;
 async function async_call()
 {
    const responseOverall = await fetch('https://eipsinsight.com/api/overallData');
    const responseStatus = await fetch('https://eipsinsight.com/api/statusPage');
    let bodyStatus = await responseStatus.text();
    objStatus = JSON.parse(bodyStatus);

    let body = await responseOverall.text();
    obj = JSON.parse(body);
    console.log(objStatus);
    // console.log(obj.Interface);
    
    
    newN = obj.Networking  - ref.Networking ;
    newE = obj.ERC - ref.ERC ;
    newInter = obj.Interface - ref.Interface ;
    newC = obj.Core - ref.Core ;
    newM = obj.Meta - ref.Meta;
    newS = obj.Standard_Track - ref.Standard_Track;
    newInfo = obj.Informational - ref.Informational;

    newFSN = objStatus.Final.Standard_Track.Networking - refStatus.Final.Standard_Track.Networking;
    newFSE = objStatus.Final.Standard_Track.ERC - refStatus.Final.Standard_Track.ERC;
    newFSC = objStatus.Final.Standard_Track.Core - refStatus.Final.Standard_Track.Core;
    newFSI = objStatus.Final.Standard_Track.Interface - refStatus.Final.Standard_Track.Interface;
    newFM  = objStatus.Final.Meta - refStatus.Final.Meta;
    newFInfo = objStatus.Final.Informational - refStatus.Final.Informational; 
    console.log(newFSE);

    newDSN = objStatus.Draft.Standard_Track.Networking - refStatus.Draft.Standard_Track.Networking;
    newDSE = objStatus.Draft.Standard_Track.ERC - refStatus.Draft.Standard_Track.ERC;
    newDSC = objStatus.Draft.Standard_Track.Core - refStatus.Draft.Standard_Track.Core;
    newDSI = objStatus.Draft.Standard_Track.Interface - refStatus.Draft.Standard_Track.Interface;
    newDM = objStatus.Draft.Meta - refStatus.Draft.Meta;
    newDInfo = objStatus.Draft.Informational - refStatus.Draft.Informational;

    console.log(newDSE);
    newRSN = objStatus.Review.Standard_Track.Networking - refStatus.Review.Standard_Track.Networking;
    newRSE = objStatus.Review.Standard_Track.ERC - refStatus.Review.Standard_Track.ERC;
    newRSC = objStatus.Review.Standard_Track.Core - refStatus.Review.Standard_Track.Core;
    newRSI = objStatus.Review.Standard_Track.Interface - refStatus.Review.Standard_Track.Interface;
    newRM = objStatus.Review.Meta - refStatus.Review.Meta;
    newRInfo = objStatus.Review.Informational - refStatus.Review.Informational;
    
    
    console.log(newRSE);
    newLSN = objStatus.Last_Call.Standard_Track.Networking - refStatus.Last_Call.Standard_Track.Networking;
    newLSE = objStatus.Last_Call.Standard_Track.ERC - refStatus.Last_Call.Standard_Track.ERC;
    newLSC = objStatus.Last_Call.Standard_Track.Core - refStatus.Last_Call.Standard_Track.Core;
    newLSI = objStatus.Last_Call.Standard_Track.Interface - refStatus.Last_Call.Standard_Track.Interface;
    newLM = objStatus.Last_Call.Meta - refStatus.Last_Call.Meta;
    newLInfo = (objStatus.Last_Call.Informational - refStatus.Last_Call.Informational);
    
    console.log(newLSE);
    newSSN = (objStatus.Stagnant.Standard_Track.Networking - refStatus.Stagnant.Standard_Track.Networking);
    newSSE = (objStatus.Stagnant.Standard_Track.ERC - refStatus.Stagnant.Standard_Track.ERC);
    newSSC = (objStatus.Stagnant.Standard_Track.Core - refStatus.Stagnant.Standard_Track.Core);
    newSSI = (objStatus.Stagnant.Standard_Track.Interface - refStatus.Stagnant.Standard_Track.Interface);
    newSM = (objStatus.Stagnant.Meta - refStatus.Stagnant.Meta);
    newSInfo = (objStatus.Stagnant.Informational - refStatus.Stagnant.Informational);
    
    
    console.log(newSSE);
    newWSN = (objStatus.Withdrawn.Standard_Track.Networking - refStatus.Withdrawn.Standard_Track.Networking);
    newWSE = (objStatus.Withdrawn.Standard_Track.ERC - refStatus.Withdrawn.Standard_Track.ERC);
    newWSC = (objStatus.Withdrawn.Standard_Track.Core - refStatus.Withdrawn.Standard_Track.Core);
    newWSI = (objStatus.Withdrawn.Standard_Track.Interface - refStatus.Withdrawn.Standard_Track.Interface);
    newWM = (objStatus.Withdrawn.Meta - refStatus.Withdrawn.Meta);
    newWInfo = (objStatus.Withdrawn.Informational - refStatus.Withdrawn.Informational);

    
    console.log(newWSE);
    newLiSN = (objStatus.Living.Standard_Track.Networking - refStatus.Living.Standard_Track.Networking);
    newLiSE = (objStatus.Living.Standard_Track.ERC - refStatus.Living.Standard_Track.ERC);
    newLiSC = (objStatus.Living.Standard_Track.Core - refStatus.Living.Standard_Track.Core);
    newLiSI = (objStatus.Living.Standard_Track.Interface - refStatus.Living.Standard_Track.Interface);
    newLiM = (objStatus.Living.Meta - refStatus.Living.Meta);
    newLiInfo = (objStatus.Living.Informational - refStatus.Living.Informational);
    console.log(newLiSN);
    console.log(newLiSE);
    console.log(newLiSC);
    update();
    getData();

    }
   
   
   

 async_call();



let overallData = new EIPSdata({

    Type_api : "overall",
    Networking : 0,
    ERC : 0,
    Interface : 0,
    Core : 0,
    Meta : 0,
    Standard_Track : 0,
    Informational : 0

});


function getData()
{
    
    // EIPSdata.find({Type_api : "overall"} , (err, res)=>{
    //     if(err)
    //     console.log(err);
    //     else
    //     {
    //         // monthlyUpdate.Overall = res;
    //         // console.log(monthlyUpdate);
    //     }
    // })
    
    
    StatusModel.find({} , (err,res)=>{
        if(err)
        console.log(err);
        else
        {
            monthlyUpdate.StatusWise = (res);
            console.log(monthlyUpdate);
        }
    })

    // console.log(monthlyUpdate);

    
}



// console.log(statusData);

// statusdoc.save();

// let statusPage = new StatusModel({
    
// })

function update()
{


 
EIPSdata.updateOne({Type_api : "overall"} , { Networking : newN , ERC : newE  , Interface : newInter, Core : newC , Meta : newM ,  Standard_Track : newS, Informational : newInfo  } , function(err)
{
   if(err)
   console.log(err);
   else
   console.log("successfully updated the db");
});

StatusModel.updateOne({Status : "Final"}, { Networking : newFSN, ERC : newFSE, Core : newFSC, Interface : newFSI, Core : newFSC, Meta : newFM , Informational : newFInfo }, function(err){
   if(err)
   console.log(err);
   else
   console.log("updated 1");
});

StatusModel.updateOne({Status : "Draft"}, { Networking : newDSN, ERC : newDSE, Core : newDSC, Interface : newDSI, Core : newDSC, Meta : newDM , Informational : newDInfo }, function(err){
    if(err)
    console.log(err);
    else
    console.log("updated 2");
 });
 StatusModel.updateOne({Status : "Review"}, { Networking : newRSN, ERC : newRSE, Core : newRSC, Interface : newRSI, Core : newRSC, Meta : newRM , Informational : newRInfo }, function(err){
    if(err)
    console.log(err);
    else
    console.log("updated 3");
 });

 StatusModel.updateOne({Status : "Last_Call"}, { Networking : newLSN, ERC : newLSE, Core : newLSC, Interface : newLSI, Core : newLSC, Meta : newLM , Informational : newLInfo }, function(err){
    if(err)
    console.log(err);
    else
    console.log("updated 4");
 });

 StatusModel.updateOne({Status : "Stagnant"}, { Networking : newSSN, ERC : newSSE, Core : newSSC, Interface : newSSI, Core : newSSC, Meta : newSM , Informational : newSInfo }, function(err){
    if(err)
    console.log(err);
    else
    console.log("updated 5");
 });

 StatusModel.updateOne({Status : "Withdrawn"}, { Networking : newWSN, ERC : newWSE, Core : newWSC, Interface : newWSI, Core : newWSC, Meta : newWM , Informational : newWInfo }, function(err){
    if(err)
    console.log(err);
    else
    console.log("updated 6");
 });

 StatusModel.updateOne({Status : "Living"}, { Networking : newLiSN, ERC : newLiSE, Core : newLiSC, Interface : newLiSI, Core : newLiSC, Meta : newLiM , Informational : newLiInfo }, function(err){
    if(err)
    console.log(err);
    else
    console.log("updated 7");
 });


}

module.exports = monthlyUpdate ;
