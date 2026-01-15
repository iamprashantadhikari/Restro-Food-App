const express = require("express");
const {
  getUser,
  updateUser,
  updatePassword,
  deleteUser,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/get", authMiddleware, getUser);
router.post("/update", authMiddleware, updateUser);
router.post("/change-password", authMiddleware, updatePassword);

// Delete User
router.delete("/delete/:id", authMiddleware, deleteUser);
module.exports = router;
