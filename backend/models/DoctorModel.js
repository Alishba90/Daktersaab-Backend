var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var doctorSchema = new Schema({
	Name: {type: String, required: true},
	Field: {type: String, required: true},
    ConsultancyFees:{type: String, required: true},
    Speciality:{type:String, required:false},
    Hospital:{type: String, required: true},
    Branch:{type: String, required: true},
    Ratings:{type: Number, default:1, min:0, max:5},
	Monday: {type: String, required: false},
	Tuesday:{type: String, required: false},
    Wednesday:{type: String, required: false},
    Thursday:{type: String, required: false},
    Friday:{type: String, required: false},
    Saturday:{type: String, required: false},
    Sunday:{type: String, required: false}
    
}, {timestamps: true});

module.exports =new mongoose.model("Doctor", doctorSchema);