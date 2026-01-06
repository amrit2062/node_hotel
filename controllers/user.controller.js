const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generate } = require("../utils/generatedtoken");

exports.Register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const phoneExists = await User.findOne({ phone });
    if (phoneExists) {
      return res.status(400).json({
        success: false,
        message: "Phone number already exists",
      });
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user
    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword, // store hashed password
    });
    const savedUser = await newUser.save();

    // generate jwt token
    const token = generate(savedUser.id, savedUser.email);
    // response

    res.status(201).json({
      success: true,
      message: "User created successfully",
      token,
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        phone: savedUser.phone,
      },
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password, phone } = req.body;

    let user;
    if (email) {
      user = await User.findOne({ email });
    } else {
      user = await User.findOne({ phone });
    }
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
    // password compare to  bcrypt
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    //generated token
    const token = generate(user._id, user.email);

    res.status(200).json({
      success: true,
      message: "user  login successfully",
      token,
      user: {
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      messsage: "Internal server error",
    });
  }
};

exports.profile = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId);
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found ",
      });
    }
    res.status(200).json({
      success: true,
      message: "user profile",
      user: `your name is ${user.name}, your email is ${user.email},your phone number ${user.phone}`,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
