const Doctor = require("../models/DoctorModel");
const Hospital= require('../models/HospitalModel')
const { body,validationResult } = require("express-validator");

const apiResponse = require("../helpers/apiResponse");

var mongoose = require("mongoose");


// Doctor Schema
function DoctorData(data) {

	this.Name = data.Name;
	this.Field= data.Field;
	this.ConsultancyFees = data.ConsultancyFees;
	this.Hospital = data.Hospital;
	this.Branch =data.Branch;
	this.Ratings=data.Ratings;
	this.Speciality=data.Speciality;
	this.Timings=data.Timings;

}


			


/**
 * Doctor List.
 * 
 * @returns {Object}
 */
exports.docterList = [
	
	function (hospital) {
		try {
			Doctor.find({Hospital: hospital.Name , Branch:hospital.Location}).then((doctors)=>{
				if(doctors.length > 0){
					return doctors;
				}else{
					return null;
				}
			});
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];


/**
 * Docters Add.
 * 
 * @param {string}      title 
 * @param {string}      description
 * @param {string}      isbn
 * 
 * @returns {Object}
 */
exports.addDoctors = [
	
	body("Name", "Name must not be empty.").isLength({ min: 1 }).trim(),
	body("Field", "Field must not be empty.").isLength({ min: 1 }).trim(),
	body("ConsultancyFees", "Please enter fees for the doctor.").isLength({ min: 1 }).trim(),

	
	(req, res) => {

		let hospitalName=req.params.Hospital;
		let Branch=req.params.Location;
		req.data.forEach(doc => {
			
		
		try {
			const errors = validationResult(req);
			
			var doctor = new Doctor(
				{ 
					Name :doc.Name,
					Field:doc.Field,
					ConsultancyFees :doc.ConsultancyFees,
					Hospital :hospitalName,
					Branch:Branch,
					Ratings:doc.Ratings,
					Speciality:doc.Speciality,
					Timings:{
						Monday :doc.Monday,
						Tuesday:doc.Tuesday,
						Wednesday:doc.Wednesday,
						Thursday:doc.Thursday,
						Friday :doc.Friday,
						Saturday:doc.Saturday,
						Sunday:doc.Sunday
					}
					
				});

			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}
			else {
				//Save book.
				doctor.save(function (err) {
					if (err) { return apiResponse.ErrorResponse(res, err); }
					let doctorData = new DoctorData(doctor);
					return apiResponse.successResponseWithData(res,"Doctor added Successfully.", doctorData);
				});
			}
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	});
}
];


/**
 * Doctor Delete.
 * 
 * @param {string}      id
 * 
 * @returns {Object}
 */
exports.delDoctor = [
	
	function (req, res) {

		try {

			let hospitalName=req.params.Hospital;
			let Branch=req.params.Location;
			Doctor.find({Name:req.params.Name,Hospital:hospitalName,Branch:Branch,Field:req.params.Field}, function (err, doctor) {
				if(doctor === null){
					return apiResponse.notFoundResponse(res,"No such doctor exists");
				}else{
					
						//delete doctor.
						Doctor.remove({Name:req.params.Name,Hospital:hospitalName, Branch:Branch,Field:req.params.Field},function (err) {
							if (err) { 
								return apiResponse.ErrorResponse(res, err); 
							}else{
								return apiResponse.successResponse(res,"Doctor record deleted successfully.");
							}
						});
					
				}
			});
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

