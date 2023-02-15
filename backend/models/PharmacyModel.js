import mongoose from "mongoose";
const PharmacySchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  Phone: {
    type: String,
    required: true,
  },

   Time: {
    type: String,

  },
  Featured:{
      type:Boolean
  },
 AvalibleMedicines: 
      [{
      Name:{type:String,required:true},
      Quantity:{type:No,required:true} 
}]


});

export default mongoose.model("Pharmacy", PharmacySchema)