const express  = require('express');
const cors  = require('cors');

const path = require('path');

// const {Eip_model ,status_schema} = require('./model/eipSchema');
const cur_month_data = require('./update_server');

const mongoose = require('mongoose');

// mongoose.connect("mongodb+srv://admin-ritik:ritikapi21@cluster0.elbmwff.mongodb.net/eipsdata" ,{
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// const conn = mongoose.createConnection("mongodb+srv://admin-ritik:ritikapi21@cluster0.elbmwff.mongodb.net/eips", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }, (err)=>{
//     if(err)
//     console.log(err);
//     else
//     console.log("eips DB connected");
// });

// const StatusModel = conn.model('status', status_schema);

let categoryEIP = ['Networking','ERC','Core','Interface','Meta', 'Informational'];

const app = express();
app.use(cors());

setTimeout(afterWait , 2000);

function afterWait()
{

    console.log(cur_month_data);
    let newcnt_erc = 0;
    let newcnt_core = 0;
    let newcnt_net = 0;
    let newcnt_inter = 0;
    let newcnt_meta = 0;
    let newcnt_info = 0;

    // let arr = Object.keys(cur_month_data);

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

    

}

