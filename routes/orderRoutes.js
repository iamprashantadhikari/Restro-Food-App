const express = require("express");
const { placeOrder } = require("../controllers/orderController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/place_order", authMiddleware, placeOrder);

module.exports = router;
