const mongoose = require("mongoose");

const eip_schema  = new mongoose.Schema({
    eip : {type : String , default : undefined},
    type : {type : String , default : undefined},
    category : {type : String , default : undefined},
    status : {type : String , default : undefined}
})

const status_schema  = new mongoose.Schema({
    Year : String,
    Month : String, 
    Status : String,
    Networking : [String],
    ERC : [String],
    Core : [String],
    Interface : [String],
    Meta : [String],
    Informational : [String],
    Undefined : [String]
})

const past_eipschema = new mongoose.Schema({
    Eip : String,
    Merged_date : String,
    Commit_id : String,
    Pr_num : String,
    Author : String,
    Status : String,
    Type : String,
    Category : String

});

const yearly_schema = new mongoose.Schema({
    Year : String,
    January : [{type : String}],
    February : [{type : String}],
    March : [{type : String}],
    April : [{type : String}],
    May : [{type : String}],
    June : [{type : String}],
    July : [{type : String}],
    August : [{type : String}],
    September : [{type : String}],
    October : [{type : String}],
    November : [{type : String}],
    December : [{type : String}],
});

// const StatusModel = new mongoose.model('status' , status_schema);

const Eip_model = new mongoose.model('eip' , eip_schema);

module.exports = {Eip_model , status_schema , past_eipschema , yearly_schema};
