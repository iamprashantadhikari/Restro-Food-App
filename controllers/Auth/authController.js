const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const crypto = require("crypto");

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
      if (await bcrypt.compare(password, user.password)) {
        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });
        user.password = undefined;
        return res.status(200).send({
          success: true,
          message: "Login Successfully",
          token,
          user,
        });
      } else {
        return res.status(422).send({
          success: false,
          message: "Invalid Credientials, Please try again!",
        });
      }
    } else {
      return res.status(404).send({
        success: false,
        message: "User not found",
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

const forgotPassword = async (req, res) => {
  try {
    const email = req.body.email;
    if (!email) {
      return res.status(422).send({
        success: false,
        message: "Email is required",
      });
    }
    const userExist = await userModel.findOne({ email });
    if (!userExist) {
      return res.status(404).send({
        success: false,
        message: "Invalid email",
      });
    }
    const otp = crypto.randomInt(100000, 999999).toString();
    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");
    userExist.otp = hashedOtp;
    userExist.otpExpires = Date.now() + 10 * 60 * 1000;
    await userExist.save();
    // send otp logic goes here in future
    // this logic is used for sms

    return res.status(200).send({
      success: true,
      message: "Otp sent Successfully to registerd email",
      otp: otp, // temp
      requestId: userExist._id,
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

const verifyOtp = async (req, res) => {
  try {
    const { requestId, otp } = req.body;
    if (!requestId || !otp) {
      return res.status(422).send({
        success: false,
        message: "All fields are required",
      });
    }
    if (requestId.length !== 24) {
      return res.status(422).send({
        success: false,
        message: "Invalid Request",
      });
    }
    const user = await userModel.findById(requestId);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

    if (user.otp !== hashedOtp) {
      return res.status(422).send({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (user.otpExpires < new Date()) {
      return res.status(422).send({
        success: false,
        message: "Otp Expired",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedResetToken;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).send({
      success: true,
      message: "Otp Verified",
      resetToken: resetToken,
    });

    // const user = await userModel.findOne({
    //   _id: requestId,
    //   otp: hashedOtp,
    //   otpExpires: { $gt: Date.now() },
    // });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { resetToken, newPassword, confirmPassword } = req.body;
    if (!resetToken || !newPassword || !confirmPassword) {
      return res.status(402).send({
        success: false,
        message: "All fields are required",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(422).send({
        success: false,
        message: "Password didn't match",
      });
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user = await userModel.findOne({ resetPasswordToken: hashedToken });
    if (!user) {
      return res.status(403).send({
        success: false,
        message: "Invalid Token",
      });
    }

    const hashPassword = bcrypt.hashSync(newPassword, 10);
    user.password = hashPassword;
    user.resetPasswordToken = undefined;
    await user.save();

    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
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

module.exports = {
  registerController,
  loginController,
  forgotPassword,
  verifyOtp,
  resetPassword,
};
