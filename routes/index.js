const express = require("express");
const router = express.Router();
const menuRoutes = require("./menu.route");
const personRoutes = require("./person.route");
const userRoutes = require("./user.route");

router.use("/menu", menuRoutes);
router.use("/person", personRoutes);
router.use("/user",userRoutes);

module.exports = router;
