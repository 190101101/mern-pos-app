const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes.js');
const logger = require("morgan");
const app = express();

dotenv.config()
 
const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('connected');
    }catch(error){
        throw error;
    }
}

app.use(logger("dev"));
app.use(express.json());
app.use(cors());

app.use('/server/bill', routes.bill);
app.use('/server/category', routes.category);
app.use('/server/product', routes.product);
app.use('/server/user', routes.user);
app.use('/server/auth', routes.auth);

app.listen(process.env.PORT || 5000, () => {
    connect();
    console.log(process.env.PORT);
})