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

mongoose.connect("mongodb://127.0.0.1:27017/eipsdata" ,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const conn = mongoose.createConnection("mongodb://127.0.0.1:27017/eips", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err)=>{
    if(err)
    console.log(err);
    else
    console.log("eips DB connected");
});

const StatusModel = conn.model('statuseipinfo', status_schema);



const app = express();
app.use(cors());

const dir = dirPath;

const d = new Date();
let stringDate = d.toString();

let cur_day = stringDate.substring(8,10);
let cur_month = stringDate.substring(4,7);
let cur_year = stringDate.substring(11,15);

let statusEIP = ['Final','Draft','Review','Last_Call','Stagnant','Withdrawn','Living' ];
let categoryEIP = ['Networking','ERC','Core','Interface','Meta', 'Informational'];
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
            // console.log("changing from " + match.status + "to " + status);
            // cur_month_data[eip] = {"status" : status , "category" : category , "type" : type};
            // console.log(cur_month_data);
           
        }

    });
}

function compare2(eip , type ,category , status)
{
    Eip_model.find({"eip" : eip} ,(err , result) =>{

        // console.log(result + "here");
        
          if(err)
          console.log("NOT FOUND");
          else if(result.length == 0)
          {
            // console.log(result);

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
                        cur_month_data[status][type] = ar2
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
                 // Update mongoDB monthly data}

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

                    // console.log(cur_month_data);
               
                //   update_monthly(eip , status , category , type);

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

setTimeout(afterWait , 10000);





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
            StatusModel.find({"Status" : status}, (err ,res)=>{
                if(err)
                console.log(err);
                else
                {
                  let pre = res[0];

                   let cnt_net  =  Number(pre.Networking[0]) + data_add[status].Networking;
                   let cnt_erc  =  Number(pre.ERC[0]) + data_add[status].ERC ;
                   let cnt_core =  Number(pre.Core[0]) + data_add[status].Core;
                   let cnt_inter = Number(pre.Interface[0]) + data_add[status].Interface;
                   let cnt_meta =  Number(pre.Meta[0]) + data_add[status].Meta; 
                   let cnt_info =  Number(pre.Informational[0]) + data_add[status].Informational;



                   let arr_net = pre.Networking , arr_erc = pre.ERC , arr_core = pre.Core , arr_inter = pre.Interface , arr_meta  = pre.Meta , arr_info = pre.Informational;
                   arr_net[0] = cnt_net.toString();
                   arr_erc[0] = cnt_erc.toString();
                   arr_core[0] = cnt_core.toString();
                   arr_inter[0] = cnt_inter.toString();
                   arr_meta[0] = cnt_meta.toString();
                   arr_info[0] = cnt_info.toString();

                   
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

                   StatusModel.updateOne({"Status" : status}, {"Networking": arr_net , "ERC": arr_erc ,"Core": arr_core ,"Interface": arr_inter ,"Meta": arr_meta, "Informational": arr_info },{new: true}, (err , docs)=>{
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
            });   
        }
    }
}

// function getData()
// {
//     StatusModel.find({} , (err,res)=>{
//         if(err)
//         console.log(err);
//         else
//         {
//             let monthlyUpdate = (res);
//             console.log(monthlyUpdate);          
             
//             return monthlyUpdate;
//             // module.exports = monthlyUpdate;
//         }
//     })
// }



// function send(){



// }








