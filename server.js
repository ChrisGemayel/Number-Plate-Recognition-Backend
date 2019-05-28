// server.js

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./db');

const app = express();


app.use(cors());
app.use(passport.initialize());
require('./passport')(passport);

const PORT = process.env.PORT || 4000;


const DetectionRoute = require('./DetectionRoute');
const BlacklistRoute = require('./BlacklistRoute');
const CameraRoute = require('./CameraRoute');
const UserRoute = require('./UserRoute');

mongoose.connect(config.DB, { useNewUrlParser: true }).then(
	() => { console.log('Database is connected') },
	err => { console.log('Can not connect to the database' + err) }
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extends: true }));

app.use('/detection', DetectionRoute);
app.use('/blacklist', BlacklistRoute);
app.use('/camera', CameraRoute);
app.use('/user', UserRoute);

app.listen(PORT, () => { 
	console.log('Server is running on PORT:', PORT);
});