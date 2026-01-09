const mongoose = require("mongoose");

// Schema design
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    address: {
      type: Array,
    },
    phone: {
      type: String,
      required: [true, "phone is required"],
    },
    usertype: {
      type: String,
      required: [true, "usertype is required"],
      default: "client",
      enum: ["client", "admin", "vendor", "driver"],
    },
    profile: {
      type: String,
      default:
        "https://www.shutterstock.com/image-vector/avatar-gender-neutral-silhouette-vector-600nw-2470054311.jpg",
    },
    otp: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
