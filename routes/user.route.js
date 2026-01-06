const { Register, login, profile } = require("../controllers/user.controller");
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");

// public route
router.post("/register", Register);
router.post("/login", login);
router.post("/profile", authMiddleware, profile);

module.exports = router;
