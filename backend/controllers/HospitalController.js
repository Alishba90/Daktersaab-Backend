const Hospital = require("../models/HospitalModel");
const Doctor = require("./DoctorController");

const { body,validationResult } = require("express-validator");

const apiResponse = require("../helpers/apiResponse");

var mongoose = require("mongoose");


// Hospital Schema
function hospitalData(data) {

    this.Name =data.Name;
	this.Location =data.Location;
	this.Email=data.Email;
	this.Password =data.Password;
	this.Phone1=data.Phone1;
	this.Phone2 =data.Phone2;
	this.Timings =data.Timings;
    this.UpdatedDate=data.UpdatedDate;
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
					let hospitalData = new hospitalData(hospital);
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
exports.addHospital = [
	
	body("Name", "Name must not be empty.").isLength({ min: 1 }).trim(),
	body("Email", "Please provide your email").isLength({ min: 1 }).trim(),
    body("Phone", "Please provide your contact number").isLength({ min: 1 }).trim(),
    body("Password", "Password should be atleast of 8 characters").isLength({ min: 8 }).trim(),
    body("Password").custom((value)=>{

        if(!value.match(/"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"/)){
            return Promise.reject("Password must contain one lowercase one uppercase one special character and a number");
            }
        }),

	body("Location", "Location must not be empty").isLength({ min: 1 }).trim().custom((value,{req}) => {
		return Hospital.findOne({Location : value,Name: req.Name}).then(hospital => {
			if (hospital) {
				return Promise.reject("Hospital already exist with this location");
			}
            
		});
	}),
	
	(req, res) => {
		try {
			const errors = validationResult(req);
			var hospital = new Hospital(
				{ 
                    Name:req.body.Name,
	                Location:req.body.Location,
                    Email:req.body.Email,
                    Password:req.body.Password,
                    Phone1:req.body.Phone1,
                    Phone2 :req.body.Phone2,
                    Timings:req.body.Timings,
                    UpdatedDate:req.body.UpdatedDate,

				});

			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}
			else {
				//Save book.
				hospital.save(function (err) {
					if (err) { return apiResponse.ErrorResponse(res, err); }
					let HospitalData = new HospitalData(hospital);
					return apiResponse.successResponseWithData(res,"Hospital added successfully.", HospitalData);
				});
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
                        Doctor.Doctor.remove({Hospital:hospital.ObjectId})
                        
				}
			});
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];