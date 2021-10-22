// Database for Free Stuff App
// like user-services.js, this will do database operations and maybe call SQL queries

const mongoose = require('mongoose');
// const productModel = require("./product");
// const sellerModel = require("./user");

mongoose.connect(
    'mongodb://localhost:27017/FreeStuff',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).catch(error => console.log(error));