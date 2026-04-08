const express = require("express");
const {
  placeOrder,
  changeOrderStatus,
  getAllOrders,
} = require("../controllers/orderController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/place_order", authMiddleware, placeOrder);

router.post("/change_status/:id", authMiddleware, changeOrderStatus);

router.get("/all", authMiddleware, getAllOrders);

module.exports = router;
