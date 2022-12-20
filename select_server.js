const express  = require('express');
const app = express();

const mongoose = require('mongoose');

const {Eip_model ,status_schema} = require('./model/eipSchema');

mongoose.connect("mongodb+srv://admin-ritik:ritikapi21@cluster0.elbmwff.mongodb.net/eipsdata" ,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const conn = mongoose.createConnection("mongodb+srv://admin-ritik:ritikapi21@cluster0.elbmwff.mongodb.net/eips", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err)=>{
    if(err)
    console.log(err);
    else
    console.log("eips DB connected");
});

const StatusModel = conn.model('statuseipinfo', status_schema);
let obj = [];
let obj2;


function getData(year , month)
{
     StatusModel.find({"Year" : year , "Month" : month} , (err , res)=>{
        if(err)
        console.log(err);
        else
        {
            obj = res;
        }
     })        
}


 app.get('/currentMonth/:year/:month' , async(req , res)=>{
    let year = req.params.year;
    let month = req.params.month;

    getData(year , month);
    
    res.send(obj);
 })

let port = process.env.PORT;

if (port == null || port == "") {
  port = 3821;
}

app.listen(port,()=>{
    console.log('Server is running at port 3821');
})

