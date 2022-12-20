const express  = require('express');
const cors  = require('cors');
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// dotenv.config({ path: "./config.env" });
// require("./db/conn");

const monthlyUpdate = require('./database_server');

const fs = require('fs');
var process = require("process");

const matter = require('gray-matter');
const fetch = require('node-fetch');
const path = require('path');


const dirPath = path.join(__dirname,'EIPS');



const app = express();
app.use(cors());

// it will display the data in json when post.
app.use(express.json());

console.log(dirPath);
const dir = dirPath;

let rawData = [];


let countMeta = 0 ;
let countInformational = 0 ;
let countStandardTrack = 0;
let countERC = 0;
let countCore = 0;
let countNetworking = 0 ; 
let countInterface = 0 ;

let statusEIP = ['Final','Draft','Review','Last_Call','Stagnant','Withdrawn','Living'];

let categoryEIP = ['Networking','ERC','Core','Interface'];

let typeEIP = ['Standard_Track', 'Meta', 'Informational' ];


let allinfo = [];

for(let curStatus of statusEIP)
{
  let obj = {};
  let curarr = [];  
  obj[curStatus] = curarr;
  
  allinfo.push(obj);
}

function allinfofun(datainfo, status)
{
    if(status == 'Last Call')
    status = 'Last_Call';

      for(let obj of allinfo)
      {
          let flag = 0 ;
          // console.log(obj);
          for(let statusObj in obj)
          {
              if(statusObj === status)
              {
                  obj[status].push(datainfo);
                  flag=1;
                  break;
              }
          }
          if(flag)
              break;

      }
  }


let statusPage = {};
for(let varStatus of statusEIP)
{
    let temp={};

    for(let varType of typeEIP)
    {
        if(varType == 'Standard_Track' )
        {
            let temp2 = {};

            for(let varCategory of categoryEIP)
            {
                temp2[varCategory] =0;
            }
            temp[varType] = temp2;
        }
        else if(varType == 'Meta' )
        {
            temp[varType] = 0;
        }
        else if(varType == 'Informational')
        {
            temp[varType] = 0;
        }
        
    }

    statusPage[varStatus] = temp;
}

let typeChart = {};
for(let varType of typeEIP)
{
    let temp = {};
    let flag = 0;
    if(varType == 'Standard_Track')
    {

        for(let varCategory of categoryEIP)
        {
          temp[varCategory] = 0 ;
        }

        flag = 1;

    }
    
    if(flag)
    typeChart[varType] = temp;
    else
    typeChart[varType]  = 0 ;
}

let chart2 = {};

for(let varStatus of statusEIP)
{
    let temp = {};

    for(let varCategory of categoryEIP)
    {
        temp[varCategory] = 0;
    }

    chart2[varStatus] = temp;

}


function chartForHomeAndMonthly(type, category, status)
{
    if(status == 'Last Call')
        status = 'Last_Call';

    for(let statusVar in chart2)
    {
        
        if(statusVar == status && type == 'Standards Track')
        {
            for(let categoryVar in chart2[statusVar])
            {
               if(categoryVar == category)
               {
                chart2[statusVar][categoryVar] ++;
                break;
               }
            }
            break;
        }
    }
}

function typeChartData(type,category,status)
{
   let ar1 = Object.keys(typeChart);
         
   for( let childObj of ar1 )
   {
        if( childObj == 'Standard_Track'  && type == 'Standards Track' )
        {    
         let ar2 = Object.keys( typeChart[ childObj ] );

            for( let key of ar2 )
            {
                if( category == key )
                {
                  typeChart[ childObj ][ key ] ++;
                  break;
                }
            }
         break;
        }
        else if(type == 'Meta' && type == childObj){
              
            typeChart[childObj] ++;
            break;

        }
        else if(type == 'Informational' && type == childObj)
        {
             typeChart[childObj] ++;
             break;
        }
    }

}


function statusPageData(type,category,status)
{
    if(status == 'Last Call')
    status = 'Last_Call';

   for(let varStatus in statusPage)
   {
      if(varStatus == status && type == 'Standards Track')
      {
        let typeCorr = 'Standard_Track';
        for(let varCategory in statusPage[varStatus][typeCorr])
        {
            if(category == varCategory)
            {
                statusPage[varStatus][typeCorr][varCategory] ++;
                break;
            }
        }
        break; 
      }
      else if(varStatus == status && type == 'Meta')
      {
        statusPage[varStatus][type] ++;
        break;
      }
      else if(varStatus == status && type == 'Informational')
      {
        statusPage[varStatus][type] ++;
        break; 
      }
   }
}


let homeobj = {};
function homePageData(type,category,status)
{
    if(type == 'Meta')
    countMeta++;
    else if(type == 'Informational')
    {countInformational++;}
    else if(type == 'Standards Track')
    countStandardTrack++;

    if(category == 'ERC')
    countERC++;
    else if(category == 'Core')
    countCore++;
    else if(category == 'Interface')
    countInterface++;
    else if(category == 'Networking')
    countNetworking++;


    homeobj["Networking"]=countNetworking;
    homeobj["ERC"]=countERC;
    homeobj["Interface"]=countInterface;
    homeobj["Core"]=countCore; 
    homeobj["Meta"]=countMeta;
    homeobj["Standard_Track"]=countStandardTrack;
    homeobj["Informational"]=countInformational;
}

 function addRawData(content)
 {
    rawData.push(content);
 }

 function readFiles(dir){
  
 fs.readdir(dir, function(err,files){
    if(err)
    {
        console.error("Could not list the file ", err);
        process.exit(1);
    }
   
    console.log(files.length);

    files.forEach(function(file){

         fs.readFile( `${dir}/${file}` ,'utf8', function(err, content){
            
            if(err)
            {
                console.error(err);
                process.exit(1);
            }
            
            let eipfile = matter(content);
            let data = eipfile.data;
            let type = eipfile.data.type;
            let status = eipfile.data.status;
            let category = eipfile.data.category;

            addRawData(eipfile);
            homePageData(type, category, status);
            chartForHomeAndMonthly(type, category, status);
            typeChartData(type, category, status);
            statusPageData(type, category, status);
            allinfofun(data , status);
         });
    });

    // console.log("I am done fecthing !");

 });

//  console.log("Every thing loooks good !");

}


readFiles(dir);

// link the router file to app.js
app.use(require("./router/auth"));

app.get('/allinfo' ,async(req, res)=>{
    res.send(allinfo);
})

app.get('/overallData', async(req,res)=>{ 
    res.send(homeobj);
})

app.get('/chartData-Home-Monthly', async(req,res)=>{
    res.send(chart2);
})

app.get('/typePage', async(req,res)=>{
    res.send(typeChart);
})

app.get('/statusPage', async(req,res) =>{
    res.send(statusPage);
})

app.get('/currentMonth' , async(req ,res)=>{
    res.send(monthlyUpdate);
})

app.get('/rawData' , async(req ,res)=>{
    res.send(rawData);
})

let port = process.env.PORT;

if (port == null || port == "") {
  port = 3821;
}

app.listen(port,()=>{
    console.log('Server is running at port 3821');
})

