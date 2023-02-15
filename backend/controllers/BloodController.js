const Blood = require("../models/BloodModel");
const Doctor = require("./DoctorController");
const apiResponse = require("../helpers/apiResponse");



// Hospital Schema
function BloodData(data) {
    
    this.Name =data.Name;
	this.Location =data.Location;
	this.Email=data.Email;
	this.Password =data.Password;
	this.Phone1=data.Phone1;
	this.Phone2 =data.Phone2;
	this.Photos=data.Photos;
	this.Time=data.Time;
    this.Featured=data.Featured;
    this.AvailibleBloodGroup=data.AvailibleBloodGroup
}

exports.addBlood= [
	
	(req, res) => {
		
            
	
			var blood = new Blood(
				{   
                    Name:req.body.name,
	                Location:req.body.location,
                    Email:req.body.email,
                    Password:req.body.password,
                    Phone1:(req.body.phone1.toString()),
                    Phone2 :(req.body.phone2.toString()),
                    Time:req.body.time,
					Photos:req.body.photos,
                    Featured:req.body.featured


				});
            blood.findOne({Location : req.body.location,Name: req.body.name}).then(h => {
			if (h) {
				return res.status(430).send({ error: "Blood Bank already exist" });
			}else{ 
            
		
			
				//register blood bank
                try {
                        blood.save();
                        
                        res.send({message: "Blood Bank Registered Successfully"});
                    } catch (err) {
                        console.log("db error", err);
                        return res.status(422).send({ error: err.message });
                    }
            }
            
				
			});
		
	}
];
