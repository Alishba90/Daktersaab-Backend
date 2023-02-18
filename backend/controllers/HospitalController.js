const Hospital = require("../models/HospitalModel");
const Doctor = require("./DoctorController");
const apiResponse = require("../helpers/apiResponse");



// Hospital Schema
function HospitalData(data) {
    
    this.Name =data.Name;
	this.Location =data.Location;
	this.Email=data.Email;
	this.Password =data.Password;
	this.Phone1=data.Phone1;
	this.Phone2 =data.Phone2;
	this.Photos=data.Photos;
	this.Time=data.Time;
    this.Department=data.Department
}

/**
 * Hospital Detail.
 * 
 * @param {string}      id
 * 
 * @returns {Object}
 */

exports.HospitalBranches=[

async	function(req,res){
		try{
			

		await	Hospital.find({Name:req.params.Name}).then((hospital)=>{

			let branches=[]
				
			if(hospital.length>0){
				
				for (var i =0;i<hospital.length;i++){
				
				let hospitalData =new HospitalData(hospital[i]);
				
				branches.push(hospitalData.Location)
				}
				
				return res.status(200).send({ branches:branches });
				
				
			}else{return res.status(440).send({ error: "no branches" });}	
		}			
			)}
		catch(err){
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
}

]

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



exports.addHospital = [
	
	(req, res) => {
			let dep=[]
            for (var i=0;i<req.body.department;i++){
				dep.push({Name:req.body.department[i],Phone:'',Password:''})
			}
	
			var hospital = new Hospital(
				{   
                    Name:req.body.name,
	                Location:req.body.location,
                    Email:req.body.email,
                    Password:req.body.password,
                    Phone1:(req.body.phone1.toString()),
                    Phone2 :(req.body.phone2.toString()),
                    Time:{Open:req.body.timings.open,Close:req.body.timings.close},
					Photos:req.body.photos,
					Department:dep
				});
            Hospital.findOne({Location : req.body.location,Name: req.body.name}).then(h => {
			if (h) {
				return res.status(430).send({ error: "Hospital already exist" });
			}else{ 
            
		
			
				//register hospital
                try {
                        hospital.save();
                        
                        res.send({message: "Hospital Registered Successfully"});
                    } catch (err) {
                        console.log("db error", err);
                        return res.status(422).send({ error: err.message });
                    }
            }
            
				
			});
		
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