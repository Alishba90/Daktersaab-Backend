var express = require("express");

var HospitalRouter = require("./hospital");
var PharmacyRouter = require("./pharmacy");
var BloodRouter = require("./blood");

var app = express();


app.use("/hospital/", HospitalRouter);
app.use("/pharmacy/", PharmacyRouter);
app.use("/blood/", BloodRouter);

module.exports = app;