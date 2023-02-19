var express = require("express");

const HospitalController=require("../controllers/HospitalController");

var router = express.Router();


router.get("/detail/:Name/:Location", HospitalController.HospitalDetail);
router.post("/add", HospitalController.addHospital);
router.get("/branch/:Name", HospitalController.HospitalBranches);
router.post("/deptvalid", HospitalController.departValid);
router.delete("/del/:Name/:Location", HospitalController.delHospital);

module.exports = router;