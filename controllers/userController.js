const User = require("../model/userModel");
const bcrypt = require("bcryptjs");

const handleUserRegistrationController = async (req, res) => {
  try {
    const { email, password, answer } = req.body;

    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    }
    if (!password) {
      return res.status(400).send({ message: "Password is required" });
    }
    if (!answer) {
      return res.status(400).send({ message: "Answer is required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "Email already exists please login",
      });
    }
    const user = await User.create({
      email,
      password,
      answer,
    });
    user.save();
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (e) {
    return res.status(400).send({
      success: false,
      message: "Some error occurred in registration",
      e,
    });
  }
};

const handleUserLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Invalid credentials",
      });
    } else {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).send({
          success: false,
          message: "Email is not registerd",
        });
      }
      const isMatch = await user.comparePassword(password);
      if (isMatch) {
        const token = await user.generateAuthTokens();
        console.log(token);
        return res.send({
          success: true,
          message: "Login successfully",
          user: {
            _id: user._id,
            email: user.email,
          },
          token,
        });
      } else {
        return res.status(400).send({
          success: false,
          message: "Invalid credentials",
        });
      }
    }
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: "Some error occurred",
      err,
    });
  }
};

const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

const handleUpdatePasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "Answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }

    const user = await User.findOne({ email, answer });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(user._id, { password: newHashedPassword });
    user.save();
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

const handleDeleteUserController = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User does not exists",
      });
    }
    res.status(200).send({
      success: true,
      message: "User deleted Successfully",
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
  handleUserRegistrationController,
  handleUserLoginController,
  handleUpdatePasswordController,
  handleDeleteUserController,
};
