const express = require("express");
const {
  registerController,
  loginController,
  forgotPassword,
  verifyOtp,
  resetPassword,
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
router.post("/reset-password", resetPassword);

module.exports = router;
