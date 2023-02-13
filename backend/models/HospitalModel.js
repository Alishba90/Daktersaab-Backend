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
	Password: {type: String, required: false},
	Phone1: {type: String, required: true},
	Phone2: {type: String, required: false},
	
	UpdatedDate:{type:Date, default:Date.now()}
}, {timestamps: true});

// Virtual for hospital and its branch


hospitalSchema.pre('save',async function(next){
    const hospital= this;
    console.log('before hashing',hospital.password);
    if(!hospital.isModified('password')){
        return next();
    }
    hospital.password = await bcrypt.hash(hospital.password, 8);
    console.log('after hashing', hospital.password);
    next();
})

module.exports = new mongoose.model("Hospital", hospitalSchema);