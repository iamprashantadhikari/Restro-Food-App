const express = require("express");
const {
  registerController,
  loginController,
  forgotPassword,
  verifyOtp,
} = require("../controllers/Auth/authController");

const router = express.Router();

// routes
//REGISTER || POST
router.post("/register", registerController);

//Login
router.post("/login", loginController);

// Forgot Password
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);

module.exports = router;
