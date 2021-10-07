const mongoose = require('mongoose');
const user = "YOUR USER NAME";
const password = "YOUR PASSWORD";

mongoose.connect("mongodb://" + user + ":" + password + "IP_ADDRESS:PORT",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "YOUR DB NAME"
    }).then(console.log("MONGODB CONNECTION OK")).catch(err => {console.log("MONGODB CONNECTION ERROR" + err.message)});
