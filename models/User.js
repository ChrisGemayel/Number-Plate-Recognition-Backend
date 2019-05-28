const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    }
},{
    collection: 'user'
});

module.exports = mongoose.model('User', User);