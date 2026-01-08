const {
  createemployee,
  getemployee,
  getemployeeWorktype,
  updateemployee,
  deleteemployee,
} = require("../controllers/employee.controller");

const express = require("express");
const router = express.Router();


router.post("/", createemployee);
router.get("/", getemployee);
router.get("/:workType", getemployeeWorktype);
router.put("/:id", updateemployee);
router.delete("/:id", deleteemployee);



module.exports = router;
