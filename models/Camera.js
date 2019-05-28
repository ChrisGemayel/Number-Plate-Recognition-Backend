const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Camera = new Schema({
    ID: {
        type: Number,
        required: true
    },
    Coordx: {
        type: Number,
        required: true
    },
    Coordy: {
        type: Number,
        required: true
    }
},{
    collection: 'camera'
});

module.exports = mongoose.model('camera', Camera);