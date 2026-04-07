const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    orderItems: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      default: "Pending",
    },
    deliveryAddress: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    paymentAmount: { type: Number, required: true, default: 0 },
    paymentStatus: { type: String, default: "Unpaid" },
    paymentMethod: { type: String, default: "Cash on Delivery" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", orderSchema);
