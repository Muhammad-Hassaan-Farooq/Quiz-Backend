const User = require("../models/user");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({
      email,
    });
    if (!user)
      return res
        .status(200)
        .json({ success: true, msg: "User not found", data: [] });
    else {
      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
          {
            email: user.email,
            role: user.role,
          },
          "secret",
          { expiresIn: "1h" }
        );
        res.status(200).json({
          success: true,
          msg: "User logged in successfully",
          data: { token },
        });
      } else {
        res.status(200).json({
          success: true,
          msg: "Invalid password",
          data: [],
        });
      }
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, msg: "Internal server error", data: [] });
  }
};

const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email.match(/^\S+@\S+\.\S+$/))
      return res
        .status(200)
        .json({ success: true, msg: "Invalid Email format", data: [] }); // Check the email format
    let user = await User.findOne({ email });

    if (user) {
      return res
        .status(200)
        .json({ success: true, msg: "User already exists", data: [] });
    }
    if (
      password.length < 8 || // Check the length of the password
      !password.match(/[0-9]/) || // Check the presence of a number
      !password.match(/[a-z]/) || // Check the presence of a lowercase letter
      !password.match(/[A-Z]/)
    )
      return res.status(200).json({
        success: true,
        msg: "Your password must be at least 8 characters long, contain at least one number, and have a mixture of uppercase and lowercase letters.",
        data: [],
      }); // Check the presence of an uppercase letter

    await User.create({
      email,
      password: await bcrypt.hash(password, 10),
    });

    res
      .status(200)
      .json({ success: true, msg: "User created successfully", data: [] });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, msg: "Internal server error", data: [] });
  }
};

module.exports = { login, signUp };
