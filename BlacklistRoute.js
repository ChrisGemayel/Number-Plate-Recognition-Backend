const express = require('express');
const DetectionRouter = express.Router();

const Blacklist = require('./models/Blacklist');
const Detection = require('./models/Detection');
const Camera = require('./models/Camera');


var mqttHandler = require('./mqtt_handler');

var mqttClient = new mqttHandler();
mqttClient.connect();


DetectionRouter.route('/').post(function (req, res) {
    const blacklist = new Blacklist(req.body);
    var re = new RegExp("[A-Z][0-9]+");  //Regular expression to check if the Number plate conforms to the official lebanese car number plate format

    if (!blacklist.NbrPlate.match(re)) {
            res.status(400).send("This does not correspond to a valid Lebanese Number Plate format");
            return;
    }

    mqttClient.sendMessage("a"+blacklist.NbrPlate);
    console.log(blacklist);
    blacklist.save()
        .then(blacklist => {
            res.json('Blacklised successfully');
        })
        .catch(err => {
            res.status(400).send("unable to save to the database");
        });
});

DetectionRouter.route('/NbrPlates').post(function (req, res) {
    const blacklist = new Blacklist(req.body);
    Blacklist.find({NbrPlate: blacklist.NbrPlate}, (err, blacklist) => {
        console.log(blacklist);
        res.json(blacklist)
    })
});

DetectionRouter.route('/rm').post(function (req, res) {
    const blacklist = new Blacklist(req.body);
    mqttClient.sendMessage("r"+blacklist.NbrPlate);
    Blacklist.remove({NbrPlate: blacklist.NbrPlate})
        .then(blacklist => {
        res.json('Blacklisted number removed successfully');
    })
        .catch(err => {
            res.status(400).send("unable to remove from the database");
        });
});


DetectionRouter.route('/getall').get(function (req, res) {
    var myarray = [];
    const blacklist = Blacklist.find({}, (err, blacklist) => {
        for (var i = 0; i < blacklist.length; ++i) {
            console.log(blacklist[i].NbrPlate);
            myarray.push(blacklist[i].NbrPlate);
        }
        console.log(myarray);
        Detection.find({NbrPlate: myarray } , (err, detection) => {
            console.log(detection);
            res.json(detection)
        })
    });
});

DetectionRouter.route('/rmall').get(function (req, res) {
    var blacklist = Blacklist.remove({}, (err, blacklist) => {
        console.log(blacklist);
        res.json(blacklist);
    });
});

DetectionRouter.route('/getdetections').post(function (req, res) {
        const blackList = new Blacklist(req.body);


        Detection.find({NbrPlate: blackList.NbrPlate } , (err, detection) => {
            console.log(detection);
            res.json(detection)
        }).sort({Time : 1   })
});

module.exports = DetectionRouter;
