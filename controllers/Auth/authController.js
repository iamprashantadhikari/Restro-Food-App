const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");

//REGISTER
const registerController = async (req, res) => {
  try {
    const { username, email, password, phone, address } = req.body;
    if (!username || !email || !password || !phone || !address) {
      return res.status(422).send({
        success: false,
        message: "All fields are required",
      });
    }

    // check user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).send({
        success: false,
        message: "Email already registered please login",
      });
    }

    // const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, 10);

    // Create user
    const user = await userModel.create({
      username,
      email,
      password: hashPassword,
      address,
      phone,
    });
    res.status(201).send({
      success: true,
      message: "Successfully Registered",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Register",
      error,
    });
  }
};

// Login
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res.status(422).send({
        success: false,
        message: "All fields are required",
      });
    }

    // Check user
    const user = await userModel.findOne({ email });
    if (user) {
      if (password == user.password) {
        return res.status(200).send({
          success: true,
          message: "Login Successfully",
        });
      } else {
        return res.status(422).send({
          success: false,
          message: "Password Incorrect, Please try again!",
        });
      }
    } else {
      return res.status(422).send({
        success: false,
        message: "Incorrect Credientials",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error occured",
      error,
    });
  }
};

module.exports = { registerController, loginController };
