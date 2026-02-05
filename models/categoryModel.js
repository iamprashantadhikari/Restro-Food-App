const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "Category name is required"] },
    imageUrl: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcuWTrty8k4hhQ-HE-Msg0huP8iT3QIplP-w&s",
    },
    status: { type: Boolean, default: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Category", categorySchema);
