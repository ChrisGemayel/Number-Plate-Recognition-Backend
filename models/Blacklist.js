const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Blacklist = new Schema({
    NbrPlate: {
        type: String,
        required: true
    }
},{
    collection: 'blacklist'
});

module.exports = mongoose.model('Blacklist', Blacklist);