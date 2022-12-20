const express  = require('express');
const cors  = require('cors');

const matter = require('gray-matter');

const eip_model = require('./model/eipSchema');
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://admin-ritik:ritikapi21@cluster0.elbmwff.mongodb.net/eipsdata" ,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const fs = require('fs');
var process = require("process");

const path = require('path');
const dirPath = path.join(__dirname,'EIPS');

const app = express();
app.use(cors());

let past_data = {};

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
               let eip = data.eip;
               let type = eipfile.data.type;
               let status = eipfile.data.status;

               if(type == "Standards Track")
               type = "Standard_Track";
               
               if(status == "Last Call")
               status = "Last_Call";

               let category = eipfile.data.category;

               set_data(eip , type, category , status);
        
              
            //    console.log(past_data);

            });
       });
       
    //    show();
    });

    return past_data;
 
}

function set_data(eip , type, category , status)
{
    let string_eip ;
    if(eip != undefined)
    {
      string_eip = eip.toString();
      string_eip = "eip-"+string_eip;
     //  console.log(string_eip);
     }
    past_data[string_eip] = {type , category , status};
   
}

function show()
{
    // console.log(past_data);
  
}



// function showData()
// {
//     console.log(past_data);
// }


// showData();

readFiles(dirPath);


const timeout = setTimeout( show , 1000);

app.get('/pastData' , (req,res) => {
    
    res.send(past_data);
    
})  


module.exports = past_data;

let port = process.env.PORT;

if (port == null || port == "") {
    port = 3821;
  }
  
  app.listen(port,()=>{
      console.log('Server is running at port 3821');
  })

  