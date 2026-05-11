const User = require("../models/User");
const token = require("../utils/generateToken");
const bcrypt = require("bcrypt");
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User Not Found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        status: false,
        message: "Invalid Credentials. Please try again.",
      });
    }

    const token = token(user);
    return res.status(200).json({
      status: true,
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "something went wrong, please try again. ",
      data: error.message,
    });
  }
};

exports.register = async () => {
  try {
  } catch (error) {}
};
