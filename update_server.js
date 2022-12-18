const express  = require('express');
const cors  = require('cors');
const fs = require('fs');
const dotenv = require("dotenv");
const path = require('path');
// const collection = require('./test');

let monthlyUpdate = {};

const matter = require('gray-matter');

const dirPath = path.join(__dirname,'EIPS');
const {Eip_model ,status_schema} = require('./model/eipSchema');
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/eipsdata" ,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err)=>{
    if(err)
    console.log(err);
    else
    console.log("eips monthly connected");}
    );

const conn = mongoose.createConnection("mongodb://localhost:27017/eips", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err)=>{
    if(err)
    console.log(err);
    else
    console.log("eips all data connected");
});

const StatusModel = conn.model('statuseipinfo', status_schema);


const app = express();
app.use(cors());

const dir = dirPath;

const d = new Date();
let stringDate = d.toString();
let full_curMonth;
let cur_month = stringDate.substring(4,7);

if(cur_month == "Jan")
full_curMonth = "January";
else if(cur_month == "Feb")
full_curMonth = "February";
else if(cur_month == "Mar")
full_curMonth = "March";
else if(cur_month == "Apr")
full_curMonth = "April";
else if(cur_month == "Jun")
full_curMonth = "June";
else if(cur_month == "Jul")
full_curMonth = "July";
else if(cur_month == "Aug")
full_curMonth = "August";
else if(cur_month == "Sep")
full_curMonth = "September";
else if(cur_month == "Oct")
full_curMonth = "October";
else if(cur_month == "Nov")
full_curMonth = "November";
else if(cur_month == "Dec")
full_curMonth = "December";

let cur_year = stringDate.substring(11,15);

let statusEIP = ['Final','Draft','Review','Last_Call','Stagnant','Withdrawn','Living' ];
let categoryEIP = ['Networking','ERC','Core','Interface','Meta', 'Informational', 'Undefined'];
let new_files = {};
let cur_month_data = {};


for(let status of statusEIP)
{
    let newObj= {};   
    for(let cat of categoryEIP)
    {
        let eips = [];
        newObj[cat] = eips;
    }
    newObj["change"] = "false";

    cur_month_data[status] = newObj;
    // cur_month_data["change"] = "false"; 
    
}

readFiles();

// setTimeout(send , 2000);

function update_eips(eip , status ,category , type)
{
    Eip_model.updateOne({"eip" : eip} , {"status" : status , "category" : category , "type" : type }, (err)=>{
        if(err)
        console.log(err);
        else
        {
            console.log("updated-eips-databse");         
        }

    });
}

function compare2(eip , type ,category , status)
{
    Eip_model.find({"eip" : eip} ,(err , result) =>{

        // console.log(result + "here");
        
          if(err)
          console.log(err);
          else if(result.length == 0)
          {
            // console.log(result);

            //   if(category == undefined )
            //   category = 'Undefined';

              Eip_model.create({"eip": eip , "type" : type , "category": category, "status" : status}, (err)=>{
                
                if(err)
                console.log(err);
                else
                {
                    console.log("done inserting data into table, eips");
                    
                    if(type != "Meta" && type != "Informational")
                    {
                        let ar = cur_month_data[status][category];
                        ar.push(eip);
                        cur_month_data[status][category] = ar;
                    }
                    else
                    {
                        let ar1 = cur_month_data[status][category];
                        let ar2 = cur_month_data[status][type];
                        ar1.push(eip);
                        ar2.push(eip);
                        cur_month_data[status][category] = ar1;
                        cur_month_data[status][type] = ar2;
                        // cur_month_data[status][category].push(eip);
                        // cur_month_data[status][type].push(eip);
                    }
                    cur_month_data[status].change = "true";

                    // console.log(cur_month_data);

                    console.log("saved as " + eip);

                    
                }

             });
             
          }
          else 
          {
            let match = result[0];

            console.log(match);
            
               if(match.status != status || match.type != type || match.category != category)
               {
                 // Update mongoDB monthly data

                //  if(category == undefined)
                //  category = 'Undefined';

                 if(type != "Meta" && type != "Informational")
                    {
                        let ar = cur_month_data[status][category];
                        ar.push(eip);
                        cur_month_data[status][category] = ar;
                    }
                    else
                    {
                        let ar1 = cur_month_data[status][category];
                        let ar2 = cur_month_data[status][type];
                        ar1.push(eip);
                        ar2.push(eip);
                        cur_month_data[status][category] = ar1;
                        cur_month_data[status][type] = ar2
                        // cur_month_data[status][category].push(eip);
                        // cur_month_data[status][type].push(eip);
                    }

                    cur_month_data[status].change = "true";


                update_eips(eip , status, category ,type);

                  
               }

            }

    });
}

function readFiles(){
   
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
    
            if(year  == cur_year && month == cur_month)
            {
                fs.readFile( `${dir}/${file}` ,'utf8', function(err, content ){
                
                    let eipfile = matter(content);
                    let data = eipfile.data;
                    let eip = data.eip;
                    let type = eipfile.data.type;
                    let status = eipfile.data.status;
                    let category = eipfile.data.category;

                    if(category == undefined)
                    category = 'Undefined';
    
                    if(status == "Last Call")
                    status = "Last_Call";
                    if(type == "Standards Track")
                    type = "Standard_Track";
    
                    let eip_string = eip.toString();
    
                    new_files["eip-"+eip_string] = {type : type , category : category , status : status};
                    console.log(new_files);
                    // setTimeout(compare , 1000);
                    // compare( "eip-"+eip_string, type ,category , status);
    
                    compare2("eip-"+eip_string, type ,category , status);
                   
                });
      
            }
        });
    
        // console.log(new_files);
         
    })
   
}

function update_doc( status , arr_net , arr_core , arr_erc , arr_info , arr_inter , arr_meta , arr_undef)
{
    StatusModel.updateOne({"Status" : status , "Month" : full_curMonth , "Year" : cur_year}, {"Networking": arr_net , "ERC": arr_erc ,"Core": arr_core ,"Interface": arr_inter ,"Meta": arr_meta, "Informational": arr_info , "Undefined" : arr_undef },{new: true}, (err , docs)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log("updated current month data"); 
        }
    });
}

function createNewRecord(status, data_add)
{

    StatusModel.create({"Year" : cur_year , "Month" : full_curMonth , "Status" : status , "Networking" : [0] , "ERC": [0] ,"Core": [0] ,"Interface": [0] ,"Meta": [0], "Informational": [0] , "Undefined" : [0]}, (err) =>{
        if(err)
        console.log(err);
        else
        {
            updateRecord(status , data_add);
        }
      });
         
}

function updateRecord(status , data_add)
{
    StatusModel.find({"Status" : status ,"Year" : cur_year , "Month" : full_curMonth} ,(err , res) =>{
        if(err)
        console.log(err);
        else
        {
            let pre =  res[0];
            console.log(res);
            console.log(cur_year +" "+ full_curMonth +" "+status );

            let cnt_net  =  data_add[status].Networking;
            let cnt_erc  =  data_add[status].ERC ;
            let cnt_core =  data_add[status].Core;
            let cnt_inter = data_add[status].Interface;
            let cnt_meta =  data_add[status].Meta; 
            let cnt_info =  data_add[status].Informational;
            let cnt_undef =  data_add[status].Undefined;

            let arr_net = pre.Networking , arr_erc = pre.ERC , arr_core = pre.Core , arr_inter = pre.Interface , arr_meta  = pre.Meta , arr_info = pre.Informational , arr_undef = pre.Undefined ;
            arr_net[0] = cnt_net.toString();
            arr_erc[0] = cnt_erc.toString();
            arr_core[0] = cnt_core.toString();
            arr_inter[0] = cnt_inter.toString();
            arr_meta[0] = cnt_meta.toString();
            arr_info[0] = cnt_info.toString();
            arr_undef[0] = cnt_undef.toString();

            let names_net = cur_month_data[status].Networking;

            names_net.forEach((data)=>{
            arr_net.push(data);
           })

           let names_erc = cur_month_data[status].ERC;

            names_erc.forEach((data)=>{
            arr_erc.push(data);
           })

           let names_core = cur_month_data[status].Core;

            names_core.forEach((data)=>{
            arr_core.push(data);
           })

           let names_inter = cur_month_data[status].Interface;

            names_inter.forEach((data)=>{
            arr_inter.push(data);
           })

           let names_meta = cur_month_data[status].Meta;

            names_meta.forEach((data)=>{
            arr_meta.push(data);
           })

           let names_info = cur_month_data[status].Informational;

            names_info.forEach((data)=>{
            arr_info.push(data);
           })

           let names_undef = cur_month_data[status].Undefined;

            names_undef.forEach((data)=>{
            arr_undef.push(data);
           })


           update_doc(status , arr_net , arr_core , arr_erc , arr_info , arr_inter , arr_meta , arr_undef );
            
        }
    })
}


setTimeout(afterWait , 10000);

function waitToCreate()
{
    // Do nothing , waste some timem here
}

function afterWait()
{

    console.log(cur_month_data);

    let data_add = {};
    for(let status in cur_month_data)
    {
        let inner = {};
        for(let cat  of categoryEIP)
        {
            inner[cat] = 0;

           if(cur_month_data[status].change == "true")
           {
             let arr = cur_month_data[status][cat];
             inner[cat] = arr.length;
           }
        }

        data_add[status] = inner;
        
    }

    console.log(data_add);

    for(let status in data_add)
    {
        if(cur_month_data[status].change == "true")
        {
            StatusModel.find({"Status" : status , "Month" : full_curMonth , "Year" : cur_year}, (err ,res)=>{
                if(err)
                console.log(err);
                else
                {
                    if(res.length == 0)
                    {
                        createNewRecord(status, data_add);
                        setTimeout( waitToCreate , 30000);
                    }
                    else
                    {
                        let pre = res[0];

                        let cnt_net  =  Number(pre.Networking[0]) + data_add[status].Networking;
                        let cnt_erc  =  Number(pre.ERC[0]) + data_add[status].ERC ;
                        let cnt_core =  Number(pre.Core[0]) + data_add[status].Core;
                        let cnt_inter = Number(pre.Interface[0]) + data_add[status].Interface;
                        let cnt_meta =  Number(pre.Meta[0]) + data_add[status].Meta; 
                        let cnt_info =  Number(pre.Informational[0]) + data_add[status].Informational;
                        let cnt_undef =  Number(pre.Undefined[0]) + data_add[status].Undefined;
     
     
     
                        let arr_net = pre.Networking , arr_erc = pre.ERC , arr_core = pre.Core , arr_inter = pre.Interface , arr_meta  = pre.Meta , arr_info = pre.Informational, arr_undef = pre.Undefined;
                        arr_net[0] = cnt_net.toString();
                        arr_erc[0] = cnt_erc.toString();
                        arr_core[0] = cnt_core.toString();
                        arr_inter[0] = cnt_inter.toString();
                        arr_meta[0] = cnt_meta.toString();
                        arr_info[0] = cnt_info.toString();
                        arr_undef[0] = cnt_undef.toString();
     
                        
                        let names_net = cur_month_data[status].Networking;
     
                         names_net.forEach((data)=>{
                         arr_net.push(data);
                        })
     
                        let names_erc = cur_month_data[status].ERC;
     
                         names_erc.forEach((data)=>{
                         arr_erc.push(data);
                        })
     
                        let names_core = cur_month_data[status].Core;
     
                         names_core.forEach((data)=>{
                         arr_core.push(data);
                        })
     
                        let names_inter = cur_month_data[status].Interface;
     
                         names_inter.forEach((data)=>{
                         arr_inter.push(data);
                        })
     
                        let names_meta = cur_month_data[status].Meta;
     
                         names_meta.forEach((data)=>{
                         arr_meta.push(data);
                        })
     
                        let names_info = cur_month_data[status].Informational;
     
                         names_info.forEach((data)=>{
                         arr_info.push(data);
                        })

                        let names_undef = cur_month_data[status].Undefined;

                        names_undef.forEach((data)=>{
                        arr_undef.push(data);
                       })
     
                        update_doc(status , arr_net , arr_core , arr_erc , arr_info , arr_inter , arr_meta , arr_undef );
                    }
                }
            });   
        }
    }
}










