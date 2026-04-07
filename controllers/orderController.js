const orderModel = require("../models/orderModel");

const placeOrder = async (req, res) => {
  try {
    const { deliveryAddress, orderItems, paymentAmount, paymentMethod } =
      req.body;

    if (!deliveryAddress || !orderItems) {
      return res.status(422).send({
        success: false,
        message: "All fields are required",
      });
    }

    let totalAmount = 0;
    orderItems.map((item) => {
      totalAmount += item.price * item.quantity;
    });

    const order = new orderModel({
      user: req.user.id,
      deliveryAddress,
      orderItems,
      totalAmount,
      paymentAmount,
      paymentMethod,
    });
    await order.save();
    res.status(200).send({
      success: true,
      message: "Order Placed Successfully",
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = { placeOrder };
