var express = require("express");

const HospitalController=require("../controllers/HospitalController");

var router = express.Router();


router.get("/:Name/:Location", HospitalController.HospitalDetail);
router.post("/add", HospitalController.addHospital);

router.delete("/:Name/:Location", HospitalController.delHospital);

module.exports = router;