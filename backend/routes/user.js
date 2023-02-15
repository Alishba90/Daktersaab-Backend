var express = require("express");
var jwt=require('jsonwebtoken');
var bcrypt = require('bcrypt');
var dotenv = require('dotenv')
const Hospital = require("../models/HospitalModel");

const apiResponse = require("../helpers/apiResponse");
const BloodBank=require('../models/BloodModel')
var router = express.Router();


dotenv.config();

let organization ='';
router.post("/login", async (req, res) => {
  const { name,branch, password , org} = req.body;
  if (!name ||!branch || !password ||!org) {
    return res.status(401).json({ error: "please enter valid credentials" });
  }

    if (org==='blood'){organization=BloodBank;}
    else if  (org==='pharmacy'){organization=Pharmacy;}
    else {organization=Hospital;}

  const savedUser = await organization.findOne({ Name: name , Location:branch  });
  if (!savedUser) {
    return res.status(422).json({ error: "Sorry You are'nt registered with us ." });
  }
  try {
    bcrypt.compare(password, savedUser.Password, (err, result) => {
      if (result) {
        console.log("password matched!");
        const token = jwt.sign({ _id: savedUser._id }, process.env.SECRET_JWT);
        return res.status(200).json({ token:token });
        
      } else {
        return res.status(430).json({ error: "Please enter valid password" });
      }
    });
  } catch (err) {
    console.log(err);
  }
});


module.exports = router;
