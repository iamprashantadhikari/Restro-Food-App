const express = require("express");
const { createRestaurant } = require("../controllers/restaurantController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/add", authMiddleware, createRestaurant);
// router.get("all", )

module.exports = router;
