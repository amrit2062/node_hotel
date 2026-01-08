const {
  Register,
  login,
  profile,
  updateUser,
  changePassword,
} = require("../controllers/user.controller");
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");

// public route
router.post("/register", Register);
router.post("/login", login);
router.get("/profile", authMiddleware, profile);
router.put("/update", authMiddleware, updateUser);
router.post("/changepassword",authMiddleware,changePassword)

module.exports = router;
