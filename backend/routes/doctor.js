var express = require("express");
const DoctorController = require("../controllers/DoctorController");

var router = express.Router();
router.post("/addDr/:Hospital/:Location", DoctorController.addDoctors);

router.delete("/:Name/:Hospital/:Location/:Field", DoctorController.delDoctor);


var router = express.Router();
module.exports = router;