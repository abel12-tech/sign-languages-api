const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.registerAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingAdmin = await User.findOne({ username });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ status: "error", message: "Admin already exists" });
    }

    const admin = await User.create({
      username,
      password,
      isAdmin: true,
    });

    // Send success response with the created admin user data
    res.status(201).json({ status: "success", data: admin });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await User.findOne({ username });
    if (!admin) {
      return res
        .status(404)
        .json({ status: "error", message: "Admin not found" });
    }

    if (!admin.isAdmin) {
      return res.status(401).json({
        status: "error",
        message: "Access denied. You are not an admin",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, admin.password);
    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ status: "error", message: "Incorrect password" });
    }

    const token = jwt.sign({ userId: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ status: "success", token });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await User.find({ isAdmin: true });
    res.status(200).json({
      status: "success",
      dataLength: admins.length,
      data: admins,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
