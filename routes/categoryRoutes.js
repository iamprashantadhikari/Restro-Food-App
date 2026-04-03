const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createCategory,
  getAllCategory,
  updateCategory,
} = require("../controllers/categoryController");
const upload = require("../middlewares/upload");

const router = express.Router();

// router.get('all')
router.post(
  "/add",
  authMiddleware,
  (req, res, next) => {
    req.uploadFolder = "categories";
    next();
  },
  upload.single("image"),
  createCategory,
);

router.get("/all", getAllCategory);

router.post(
  "/update/:id",
  authMiddleware,
  (req, res, next) => {
    req.uploadFolder = "categories";
    next();
  },
  upload.single("image"),
  updateCategory,
);

module.exports = router;
