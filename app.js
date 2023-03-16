const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const db_URI = require('./src/config/db_URI');
const userRoutes = require('./src/routes/auth');


const app = express();

app.use(bodyParser.json());


//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/auth', userRoutes);

mongoose.connect(db_URI.URI)
    .then(r => {
        app.listen(5000);
        console.log('connected')
    })
    .catch(err => {
        console.log(err,
            "something might be broken in app.js");
    })