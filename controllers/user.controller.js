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

    // function validate email format usin regex

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        sucess: false,
        message: "Invaid email format",
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
exports.updateUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, phone, email } = req.body;

    //check phone uniqueness (if updating phone)

    if (phone) {
      const phoneExists = await User.findOne({ phone });
      if (phoneExists && phoneExists._id.toString() !== userId) {
        res.status(400).json({
          sucess: false,
          message: "phone number is already in use",
        });
      }
    }
    /// check updated objext( one by one Or both)
    const updatedData = {};
    if (name) updatedData.name = name;
    if (phone) updatedData.phone = phone;
    const updateUser = await User.findByIdAndUpdate(
      userId,
      { $set: updatedData },
      { new: true }
    );

    if (!updateUser) {
      res.status(404).json({
        sucess: false,
        message: "user not found",
      });
    }
    res.status(200).json({
      sucess: true,
      message: "user updated successfully",
      user: {
        id: updateUser._id,
        name: updateUser.name,
        phone: updateUser.phone,
      },
    });

    // function validate email format usin regex

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        sucess: false,
        message: "Invaid email format",
      });
    }
    res.json({
      sucess: true,
      message: "email is valid",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      sucess: false,
      message: "Internal server error",
    });
  }
};

// changed password
exports.changePassword = async (req, res) => {
  try {
    //get user id from authentication session
    const userId = req.user.id;
    //extract password from the request body
    const { currentPassword, newPassword, confirmPassword } = req.body;
    // find the databases
    const user = await User.findById(userId).select("+password");

    if (!user) {
      return res.status(404).json({
        sucess: false,
        message: "user not found",
      });
    }

    //check if the password and confirm password match
    if (newPassword !== confirmPassword) {
      return res.status(404).json({
        sucess: false,
        message: "new  password and confirmation password do not match",
      });
    }
    // compare current password with hashed in the databases
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        sucess: false,
        message: "invalid current password",
      });
    }
    // option new  password is same old password
    const isSameAsOld = await bcrypt.compare(newPassword, user.password);
    if (isSameAsOld) {
      return res.status(400).json({
        sucess: false,
        message: "new password cannot be the same as the current password ",
      });
    }
    // hash  the newpassword
    const saltRounds = 10;
    const hashNewpassword = await bcrypt.hash(newPassword, saltRounds);

    //updated the user password in the databases
    user.password = hashNewpassword;
    await user.save(); //mongoose presave  hooks can also handle hashing

    // send  a success response
    res.status(200).json({
      sucess: true,
      message: "password changed sucessfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      sucess: false,
      message: "server error during password change",
    });
  }
};
