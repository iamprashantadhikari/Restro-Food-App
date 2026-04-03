const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
  },
  status: {
    type: Boolean,
    default: true,
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model("Product", productSchema);
