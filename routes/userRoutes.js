const express = require("express");
const {
  getUser,
  updateUser,
  updatePassword,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/get", authMiddleware, getUser);
router.post("/update", authMiddleware, updateUser);
router.post("change-password", authMiddleware, updatePassword);

module.exports = router;
