var mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const validator=require("validator");

var hospitalSchema = new mongoose.Schema({
	
	Name: {type: String, required: true},
	Location: {type: String, required: true},
	Email: {type: String, required: false , validate:{
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email',
      isAsync: false
    }},
    Time: {
        Open: {type: String, required: false},
        Close: {type: String, required: false},
    },
    Photos: {type: [String]},
	Password: {type: String, required: true},
	Phone1: {type: String, required: true},
	Phone2: {type: String, required: false},
    Department:[{
        Name:{type:String},Phone:{type:String},Password:{type:String}
    }],
    MasterSecret:{type:String}
}, {timestamps: true})

// Virtual for hospital and its branch


hospitalSchema.pre('save', async function(next){
    const hospital= this;
    
    if(!hospital.isModified('Password')){
        return next();
    }
    
    hospital.Password = await bcrypt.hash(hospital.Password, 8);

    next();
})

module.exports = new mongoose.model("Hospital", hospitalSchema);