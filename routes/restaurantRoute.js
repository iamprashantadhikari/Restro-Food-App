const express = require("express");
const {
  createRestaurant,
  getAllRestaurant,
  getRestaurant,
} = require("../controllers/restaurantController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/add", authMiddleware, createRestaurant);
router.get("/all", getAllRestaurant);

router.get("/get/:id", getRestaurant);

module.exports = router;
