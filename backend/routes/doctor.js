var express = require("express");
const DoctorController = require("../controllers/DoctorController");


router.post("/:Hospital/:Location", DoctorController.addDoctors);

router.delete("/:Name/:Hospital/:Location/:Field", DoctorController.delDoctor);


var router = express.Router();
module.exports = router;