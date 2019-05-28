const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Detection = new Schema({
	ID: {
		type: Number,
		required: true
	},
	NbrPlate: {
		type: String,
		required: true
	},
	Time: {
		type: Number,
		required: true
	}
},{
	collection: 'detections'
});

module.exports = mongoose.model('Detection', Detection);