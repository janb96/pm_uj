const mongoose = require('mongoose');
const user = "root";
const password = "rabarbar123";

mongoose.connect("mongodb://" + user + ":" + password + "@10.0.40.42:27017",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "uj-pm"
    }).then(console.log("MONGODB CONNECTION OK")).catch(err => {console.log("MONGODB CONNECTION ERROR" + err.message)});