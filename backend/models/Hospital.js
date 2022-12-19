var mongoose = require("mongoose");

var HospitalSchema = new mongoose.Schema({
	Name: {type: String, required: true},
	Location: {type: String, required: true},
	email: {type: String, required: false},
	password: {type: String, required: false},
	Phone: {type: Number, required: true},
}, {timestamps: true});

// Virtual for user's full name
HospitalSchema
	.virtual("fullName")
	.get(function () {
		return this.firstName + " " + this.lastName;
	});

module.exports = mongoose.model("Hospital", HospitalSchema);