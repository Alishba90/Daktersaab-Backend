var express = require("express");
var DocRouter=require('./doctor');
var HospitalRouter = require("./hospital");
var PharmacyRouter = require("./pharmacy");
var BloodRouter = require("./blood");
var UserRouter =require('./user')
var app = express();



app.use('/doctor',DocRouter)
app.use('/login',UserRouter)
app.use("/hospital", HospitalRouter);
app.use("/pharmacy", PharmacyRouter);
app.use("/blood", BloodRouter);






module.exports = app;