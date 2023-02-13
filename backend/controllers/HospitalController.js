const Hospital = require("../models/HospitalModel");
const Doctor = require("./DoctorController");



const apiResponse = require("../helpers/apiResponse");

var mongoose = require("mongoose");


// Hospital Schema
function HospitalData(data) {
    
    this.Name =data.Name;
	this.Location =data.Location;
	this.Email=data.Email;
	this.Password =data.Password;
	this.Phone1=data.Phone1;
	this.Phone2 =data.Phone2;
	
    
}




/**
 * Hospital Detail.
 * 
 * @param {string}      id
 * 
 * @returns {Object}
 */
exports.HospitalDetail = [
	
	function (req, res) {

		try {
			Hospital.findOne({Name:req.params.Name,Location:req.params.Location}).then((hospital)=>{                
				if(hospital !== null){
					let hospitalData = new HospitalData(hospital);
                    var doctors=Doctor.docterList(hospital);
                    if (doctors!==null){
                        return apiResponse.successResponseWithData(res, "Operation success", hospitalData=hospitalData,doctorData=doctors);            
                        }
                    else{
					return apiResponse.successResponseWithData(res, "Operation success", hospitalData=hospitalData,doctorData=null);            }
				}else{
					return apiResponse.successResponseWithData(res, "Operation success", "No such hospital exists");
				}
			});
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

/**
 * Add Hospital.
 * 
 * @param {string}      title 
 * @param {string}      description
 * @param {string}      isbn
 * 
 * @returns {Object}
 */


function validating(req){Hospital.findOne({Location : req.body.location,Name: req.body.name}).then(hospital => {
			if (hospital) {
				return Promise.reject("Hospital already exist with this location");
			}
else{return null}
            
		});
}
exports.addHospital = [
	



async	(req, res) => {
		try {
console.log("i recieved",req.body)
			const errors = validating(req);
			var hospital = new Hospital(
				{   
                    Name:req.body.name,
	                Location:req.body.location,
                    Email:req.body.email,
                    Password:req.body.password,
                    Phone1:(req.body.phone1.toString()),
                    Phone2 :(req.body.phone2.toString()),
                    

				});

			if (errors) {
                
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors);

			}
			else {
				//Save book.
                try {
                        await hospital.save();
                        console.log("registered doctor")
                        res.send({message: "Donor Registered Successfully"});
                    } catch (err) {
                        console.log("db error", err);
                        return res.status(422).send({ error: err.message });
                    }
				
			}
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];


/**
 * Hospital Delete.
 * 
 * @param {string}      id
 * 
 * @returns {Object}
 */
exports.delHospital = [
	
	function (req, res) {
        
		try {
			Hospital.find({Name:req.params.Name,Location:req.params.Location}, function (err, hospital) {
				if(hospital === null){
					return apiResponse.notFoundResponse(res,"No such Hospital exists");
				}else{
					
						//delete book.
						Hospital.remove({Name:req.params.Name,Location:req.params.Location},function (err) {
							if (err) { 
								return apiResponse.ErrorResponse(res, err); 
							}else{
								return apiResponse.successResponse(res,"Hospital removed successfully.");
							}
						});
                        Doctor.Doctor.remove({Hospital:hospital})
                        
				}
			});
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];