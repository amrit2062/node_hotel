const {
  createMenu,
  getMenu,
  getmenuTaste,
  deletedMenutaste,
} = require("../controllers/menu.controller");

const express = require("express");
const router = express.Router();

router.post("/", createMenu);
router.get("/", getMenu);
router.get("/:taste", getmenuTaste);
router.delete("/:id", deletedMenutaste);
module.exports = router;
