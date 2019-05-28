const express = require('express');
const DetectionRouter = express.Router();

const Camera = require('./models/Camera');

DetectionRouter.route('/create').post(function (req, res) {
    const camera = new Camera(req.body);
    console.log(camera);
    camera.save()
        .then(camera => {
            res.json('Camera added successfully');
        })
        .catch(err => {
            res.status(400).send("unable to save to the database");
        });
});

DetectionRouter.route('/').post(function (req, res) {
    const myid = new Camera(req.body);
    Camera.find({ID : myid.ID}, (err, camera) => {
        console.log(camera);
        res.json(camera)
    })
});

DetectionRouter.route('/getall').get(function (req, res) {
    Camera.find({}, (err, camera) => {
        console.log(camera);
        res.json(camera)
    })
});

module.exports = DetectionRouter;
