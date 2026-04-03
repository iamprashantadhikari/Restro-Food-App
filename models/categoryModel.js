const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "Category name is required"] },
    imageUrl: {
      type: String,
    },
    status: { type: Boolean, default: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Category", categorySchema);
