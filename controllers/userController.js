const userModel = require("../models/userModel");

const getUser = async (req, res) => {
  try {
    // const users = await userModel.get();

    const user = await userModel
      .findById({ _id: req.user.id })
      .select("-password");
    // validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // user.password = undefined;
    res.status(200).send({
      success: true,
      message: "User get successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.user.id });
    if (!user) {
      return res.status(404).send({
        success: true,
        message: "User not found",
      });
    }
    const { username, phone, address } = req.body;
    if (username) user.username = username;
    if (phone) user.phone = phone;
    if (address) user.address = address;
    await user.save();

    res.status(200).send({
      success: true,
      message: "Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

const updatePassword = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = { getUser, updateUser, updatePassword };
