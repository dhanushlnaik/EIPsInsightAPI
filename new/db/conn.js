const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const formSchema = require("../model/formSchema");
const DB = process.env.DATABASE;

const conn = mongoose
  .createConnection(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err)=>{
    if(err)
    console.log("No connection from database ");
    else
    console.log("connection successfully");
  });
  // .then(() => {
  //   console.log("connection successfully");
  // })
  // .catch((err) => {
  //   console.log("No connection from database ");
  // });

const form = conn.model("MONTH", formSchema);
module.exports = form;



