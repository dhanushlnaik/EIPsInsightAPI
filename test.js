const express  = require('express');
const cors  = require('cors');
const mongoose = require("mongoose");
const mergeData = require("./data");

let months = ["Jan", "Feb" , "Mar" , "Apr", "May", "Jun", "Jul" , "Aug" , "Sep", "Oct", "Nov", "Dec"];
let years = ["2022","2021", "2020", "2019", "2018", "2017", "2016", "2015"];

const {past_eipschema , yearly_schema} = require('./model/eipSchema');

mongoose.connect("mongodb+srv://admin-ritik:ritikapi21@cluster0.elbmwff.mongodb.net/eipsdata" ,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) =>{
    if(err)
    console.log(err);
    else
    {
        console.log("yearly DB1 connected ");
    }
});

const Pastdata_model = mongoose.model('past_eip' , past_eipschema ); 

// const conn = mongoose.createConnection("mongodb+srv://admin-ritik:ritikapi21@cluster0.elbmwff.mongodb.net/yearly _data", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }, (err)=>{
//     if(err)
//     console.log(err);
//     else
//     console.log("eips DB2 connected");
// });

const Yearly_model = mongoose.model('year' ,yearly_schema );

let obj_keys = Object.keys(mergeData);

let year_wise = {};
let collection = [];



for(let year of years)
{
    let monObj = {};

    for(let mon of months)
    {
        let ar = [];
        ar.push(0);
        monObj[mon] =  ar;
    }

    year_wise[year] = monObj;
}


function collect_data(){

for(let commit_id of obj_keys)
{

   let cur_obj = mergeData[commit_id];
   let cur_date = cur_obj.date;
   let pr_num = cur_obj.pull;
   let author = cur_obj.author;


   let cur_eip = cur_obj.eip;

    if(cur_eip != undefined && cur_eip[4] >= 0 && cur_eip[4] <= 9)
    {
        collection[cur_eip] = {cur_date , commit_id , pr_num , author}  ;
    }

  
}

}

function draft(collection)
{
   let arr = Object.keys(collection);

  

   for(let eip of arr)
   {
    let cur_obj = collection[eip];
    let cur_date = cur_obj.cur_date;
    let cur_month = cur_date.substring(4,7);
    let cur_year = cur_date.substring(11,15); 

    if(cur_year[0] == '0')
    cur_year = cur_date.substring(10,14);

    // let cnt = year_wise[cur_year][cur_month][0] + 1; 
    year_wise[cur_year][cur_month].push(eip);
    year_wise[cur_year][cur_month][0]++;
   }

   let years = Object.keys(year_wise);

   for(let year of years)
   {
       let obj =  year_wise[year];

       let months = Object.keys(obj);
       
       for(let month of months)
       {
           let arr = year_wise[year][month];
           let replace = arr[0].toString();
           arr[0] = replace;
       }
   }


}

function fill_pastdata()
{
    let eips = Object.keys(collection);

    for(let cur_eip of eips)
    {
         let obj = collection[cur_eip];
         let commit_id = obj.commit_id;
         let merged_date = obj.cur_date;
         let author = obj.author;
         let pr_num = obj.pr_num;


         Pastdata_model.find({"Eip" : "cur_eip"} , (err ,res)=>{
            if(err)
            console.log(err);
            else if(res.length == 0)
            {
                let s = "";
                const doc = new Pastdata_model({
                    Eip : cur_eip,
                    Merged_date : merged_date,
                    Commit_id : commit_id,
                    Pr_num : pr_num,
                    Author : author,
                    Status : s,
                    Type : s,
                    Category : s
                });

                doc.save((err)=>{
                    if(err)
                    console.log(err);
                    else
                    {
                        console.log('Saved data past');
                    }

                })
            }
        })
    }
}

function fill_yearlydata()
{
    let years = Object.keys(year_wise);

    // console.log("hjellpo");

    // for(let year of years)
    // {
    //     let obj =  year_wise[year];

    //     let months = Object.keys(obj);
        
    //     for(let month of months)
    //     {
    //         let arr = year_wise[year][month];
    //         let real_arr = [0,1,2,2];
    //         console.log(typeof real_arr);
    //         console.log(typeof arr);
    //         console.log(arr);
    //     }
    // }

    for(let year of years)
    {
        let obj = year_wise[year];
        
        Yearly_model.find({"Year" : year} , (err ,res)=>{
            if(err)
            console.log(err);
            else if(res.length == 0)
            {
             
                const doc = new Yearly_model({
                    Year : year,
                    January : obj.Jan,
                    February : obj.Feb,
                    March : obj.Mar,
                    April : obj.Apr,
                    May : obj.May,
                    June : obj.Jun,
                    July : obj.Jul,
                    August : obj.Aug,
                    September : obj.Sep,
                    October : obj.Oct,
                    November : obj.Nov,
                    December : obj.Dec,  
                });

                doc.save(err=>{
                    if(err)
                    console.log(err);
                    else
                    console.log("saved year wise in db");
                })
            }

        })
    }
}

collect_data();
draft(collection);

fill_pastdata();
// fill_yearlydata();

// console.log(collection);
// console.log(year_wise);

module.exports = collection;
