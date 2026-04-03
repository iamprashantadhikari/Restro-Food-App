const express = require("express");
const {
  createProduct,
  getAllProducts,
  updateProduct,
} = require("../controllers/productController");
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

router.get("/all", getAllProducts);

router.post(
  "/update/:id",
  authMiddleware,
  (req, res, next) => {
    req.uploadFolder = "products";
    next();
  },
  upload.single("image"),
  updateProduct,
);

module.exports = router;
