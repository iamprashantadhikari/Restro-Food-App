const userModel = require("../models/userModel");
// const express = require("express");
// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

const getUsers = async (req, res) => {
  try {
    // const users = await userModel.get();
    return res.send("hello");
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

module.exports = { getUsers };
