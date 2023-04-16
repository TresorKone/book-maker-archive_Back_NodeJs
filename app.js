require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const db_URI = require('./src/config/db_URI');
const userRoutes = require('./src/routes/auth');
const bookRoutes = require('./src/routes/book');
const profileRoutes = require('./src/routes/profile');


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
app.use('/book', bookRoutes);
app.use('/profile', profileRoutes);

mongoose.connect(process.env.DATABASE_URI)
    .then(r => {
        app.listen(process.env.PORT || 5000);
        console.log('connected')
    })
    .catch(err => {
        console.log(err,
            "something might be broken in app.js");
    })