var mongoose = require("mongoose");
qa
var summarySchema = new mongoose.Schema({
	
    Hospital:{type:mongoose.ObjectId ,ref:'Hospital'},
    GeneralOPD:{
        DepartmentName:{type:String},
        Data:[  
            {Date:{type:String},
             information:[
                    {TokenNumber:{type:Number},Patient:{ type : String }, Phone:{type:String }}
                ]   
            }
        ]

    },
    Appointments:{
        DepartmentName:{type:String},
        Data:[
            {DoctorName:{type:String},
            information:[{ 
                    Date:{type:String},Patient:{type:String},Phone:{type:String}
                }]
            }
        ]    
    }
	

}, {timestamps: true})

module.exports = new mongoose.model("Summary", summarySchema);
