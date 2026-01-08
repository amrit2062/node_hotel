const express = require("express");
const router = express.Router();
const menuRoutes = require("./menu.route");
const employeeRoutes = require("./employee.route");
const userRoutes = require("./user.route");

router.use("/menu", menuRoutes);
router.use("/employee", employeeRoutes);
router.use("/user",userRoutes);

module.exports = router;
