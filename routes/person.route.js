const {
  createPerson,
  getPerson,
  getpersonWorktype,
  updatePerson,
  deletePerson,
} = require("../controllers/person.controller");

const express = require("express");
const router = express.Router();

router.post("/", createPerson);
router.get("/", getPerson);
router.get("/:workType", getpersonWorktype);
router.put("/:id", updatePerson);
router.delete("/:id", deletePerson);

module.exports = router;
