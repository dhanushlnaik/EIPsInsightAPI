const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/eips", {
    useNewUrlParser: true,
    useUnifiedTopology: true
} ,(err)=>{
    if (err) {
        console.log(err);
    } else {
        console.log(" connected to local DB");
    }
})

