const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

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
        success: false,
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
    const { old_password: oldPassword, new_password: newPassword } = req.body;
    if (!newPassword || !oldPassword) {
      return res.status(422).send({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(422).send({
        success: false,
        message: "Password not matched",
      });
    }

    const hashPassword = bcrypt.hashSync(newPassword, 10);
    user.password = hashPassword;
    await user.save();

    res.status(200).send({
      success: true,
      message: "Password changed successfully",
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

module.exports = { getUser, updateUser, updatePassword };
