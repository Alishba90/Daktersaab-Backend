var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var doctorSchema = new Schema({
	Name: {type: String, required: true},
	Field: {type: String, required: true},
    ConsultancyFees:{type:Number, required: true},
    Speciality:{type:String, required:false},
    Hospital:{type: String, required: true},
    Branch:{type: String, required: true},
    Ratings:{type: Number, default:1, min:0, max:5},
    Timings:{
        Monday: {type: String, required: false},
        Tuesday:{type: String, required: false},
        Wednesday:{type: String, required: false},
        Thursday:{type: String, required: false},
        Friday:{type: String, required: false},
        Saturday:{type: String, required: false},
        Sunday:{type: String, required: false}
    },
    TotalToken:{type:Number, required:true},
    Comments:[{Name:{type:String},Comment:{type: String}}],
    BookedToken:{type:Number, required:true},
}, {timestamps: true});

module.exports =new mongoose.model("DDoctor", doctorSchema);