const express = require("express");
const { createProduct } = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");

const router = express.Router();

router.post(
  "/add",
  authMiddleware,
  (req, res, next) => {
    req.uploadFolder = "products";
    next();
  },
  upload.single("image"),
  createProduct,
);

module.exports = router;
