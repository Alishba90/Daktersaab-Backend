import mongoose from "mongoose";
const BloodBankSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Location: {
    type: String,
    required: true,
  },
  Phone1: {
    type: String,
    required: true,
  },
    Phone2: {
    type: String,
    required: false,
  },
  Photos: {
    type: [String],
  },
 
  Time: {
    type: String,

  },
  Featured:{
      type:Boolean
  },
 AvalibleBloodGroup: [{
  Type: [String],
  Quantity: {Number},
  Price:{String}
 }]


});

export default mongoose.model("BloodBank", BloodBankSchema)