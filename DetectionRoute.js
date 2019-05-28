const express = require('express');
const DetectionRouter = express.Router();

const Detection = require('./models/Detection');

DetectionRouter.route('/create').post(function (req, res) {
	const detection = new Detection(req.body);
	console.log(detection);
	detection.save()
	 .then(detection => {
		res.json('Detection added successfully');
	 })
	 .catch(err => {
		res.status(400).send("unable to save to the database");
	 });
});

DetectionRouter.route('/').post(function (req, res) {
	const myid = new Detection(req.body)
	Detection.find({ID : myid.ID}, (err, detection) => {
        console.log(detection);
		res.json(detection)
		})
});

DetectionRouter.route('/getall').get(function (req, res) {
    Detection.find({}, (err, detection) => {
        console.log(detection);
        res.json(detection)
    })
});

module.exports = DetectionRouter;