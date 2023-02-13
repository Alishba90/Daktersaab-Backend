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
	Password: {type: String, required: true},
	Phone1: {type: String, required: true},
	Phone2: {type: String, required: false},

}, {timestamps: true})

// Virtual for hospital and its branch


hospitalSchema.pre('save', async function(next){
    const hospital= this;
    
    console.log('before hashing',hospital.Password);
    if(!hospital.isModified('Password')){
        return next();
    }
    
    hospital.Password = await bcrypt.hash(hospital.Password, 8);
    console.log('after hashing', hospital.Password);
    next();
})

module.exports = new mongoose.model("Hospital", hospitalSchema);