const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createCategory,
  getAllCategory,
} = require("../controllers/categoryController");
const upload = require("../middlewares/upload");

const router = express.Router();

// router.get('all')
router.post("/add", authMiddleware, upload.single("image"), createCategory);

router.get("/all", getAllCategory);

module.exports = router;
