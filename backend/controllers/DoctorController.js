const Doctor = require("../models/DoctorModel");
const Hospital= require('../models/Hospital')
const { body,validationResult } = require("express-validator");

const apiResponse = require("../helpers/apiResponse");

var mongoose = require("mongoose");


// Doctor Schema
function DoctorData(data) {

	this.Name = data.Name;
	this.Field= data.Field;
	this.ConsultancyFees = data.ConsultancyFees;
	this.Hospital = data.Hospital;
	this.Ratings=data.Ratings;
	this.Speciality=data.Speciality;
	this.Monday = data.Monday;
	this.Tuesday = data.Tuesday;
	this.Wednesday = data.Wednesday;
	this.Thursday = data.Thursday;
	this.Friday = data.Friday;
	this.Saturday = data.Saturday;
	this.Sunday = data.Sunday;

}

function HospitalID(name,location){
		Hospital.find({Name:name,Location:location}.then((hospital)=>{
			if(hospital){return hospital.id}
			else{ 
				console.log("no such hospital");
				return null;
			}
	}))
}
			


/**
 * Doctor List.
 * 
 * @returns {Object}
 */
exports.docterList = [
	
	function (hospital) {
		try {
			Doctor.find({Hospital: hospital._id}).then((doctors)=>{
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
	

	body("title", "Title must not be empty.").isLength({ min: 1 }).trim(),
	body("description", "Description must not be empty.").isLength({ min: 1 }).trim(),
	body("isbn", "ISBN must not be empty").isLength({ min: 1 }).trim().custom((value,{req}) => {
		return Book.findOne({isbn : value,user: req.user._id}).then(book => {
			if (book) {
				return Promise.reject("Book already exist with this ISBN no.");
			}
		});
	}),
	
	(req, res) => {

		let hospitalID=HospitalID(req.params.Hospital,req.params.Location);
		req.data.forEach(doc => {
			
		
		try {
			const errors = validationResult(req);
			var doctor = new Doctor(
				{ 
					Name :doc.Name,
					Field:doc.Field,
					ConsultancyFees :doc.ConsultancyFees,
					Hospital :hospitalID,
					Ratings:doc.Ratings,
					Speciality:doc.Speciality,
					Monday :doc.Monday,
					Tuesday:doc.Tuesday,
					Wednesday:doc.Wednesday,
					Thursday:doc.Thursday,
					Friday :doc.Friday,
					Saturday:doc.Saturday,
					Sunday:doc.Sunday,
				});

			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}
			else {
				//Save book.
				doctor.save(function (err) {
					if (err) { return apiResponse.ErrorResponse(res, err); }
					let doctorData = new DoctorData(doctor);
					return apiResponse.successResponseWithData(res,"Doctor added Success.", doctorData);
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

			let hospitalID=HospitalID(req.params.Hospital,req.params.Location);
			Doctor.find({Name:req.params.Name,Hospital:hospitalID,Field:req.params.Field}, function (err, doctor) {
				if(doctor === null){
					return apiResponse.notFoundResponse(res,"No such doctor exists");
				}else{
					
						//delete book.
						Doctor.remove({Name:req.params.Name,Hospital:hospitalID,Field:req.params.Field},function (err) {
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

