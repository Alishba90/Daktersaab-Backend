var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var BookSchema = new Schema({
	Name: {type: String, required: true},
	Field: {type: String, required: true},
	Monday: {type: String, required: true},
	Tuesday:{type: String, required: false},
    Wednesday:{type: String, required: false},
    Thursday:{type: String, required: false},
    Friday:{type: String, required: false},
    Saturday:{type: String, required: false},
    Sunday:{type: String, required: false},
    ConsultancyFees:{type: Number, required: true},
    Hospital:{ type: Schema.ObjectId, ref: "Hospital", required: true },
}, {timestamps: true});

module.exports = mongoose.model("Book", BookSchema);