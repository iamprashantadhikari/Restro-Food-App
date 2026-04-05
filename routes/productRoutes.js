const express = require("express");
const {
  createProduct,
  getAllProducts,
  updateProduct,
  getProductByRestaurant,
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

router.get("/get_by_restaurant/:id", getProductByRestaurant);

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
