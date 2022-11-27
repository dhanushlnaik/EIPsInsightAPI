const express = require('express');
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

require('dotenv').config()

const CONNECTION_URL = process.env.URL
const DATABASE_NAME = "MasterDB";

const app = express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
var database, collection;

app.listen(5000, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db("EIPS");
        collection = database.collection("MasterDB");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});

app.get("/getAll", async (req, res) => {
    try{
        collection.find({}).toArray((error, result) => {
            if(error) {
                return response.status(500).send(error);
            }
            res.send(result);
            console.log(result)
        })
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});