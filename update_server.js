const express  = require('express');
const cors  = require('cors');
const fs = require('fs');

const path = require('path');

const dirPath = path.join(__dirname,'EIPs');

const app = express();
app.use(cors());

const dir = dirPath;

const d = new Date();
let stringDate = d.toString();

let cur_day = stringDate.substring(8,10);
let cur_month = stringDate.substring(4,7);
let cur_year = stringDate.substring(11,15);

let curDate = cur_day+'_'+cur_month+'_'+cur_year;

let new_files = [];
fs.readdir(dir, function(err, files){

    if(err)
    {
        console.log("Encountered error");
    }

    files.forEach(function(file){
        
        let newPath = dir + '/' + file;
        let { mtime }  = fs.statSync(newPath);
        
        let stdate = mtime.toString();
        
        let day = stdate.substring(8,10);
        let month = stdate.substring(4,7);
        let year = stdate.substring(11,15);

        let modifiedDate = day+'_'+month+'_'+year;

        if( modifiedDate === curDate )
        {
           new_files.push(file);
        }
  

    });

    // console.log(new_files);
    
    
   
})
