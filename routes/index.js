const express = require("express");
const router = express.Router();
const menuRoutes = require("./menu.route");
const personRoutes = require("./person.route");

router.use("/menu", menuRoutes);
router.use("/person", personRoutes);

module.exports = router;
