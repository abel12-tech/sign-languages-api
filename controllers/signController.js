const User = require("../models/userModel");
const Sign = require("../models/signModel");
const Category = require("../models/categoryModel");

exports.getSignsStats = async (req, res) => {
  try {
    const totalApprovedSigns = await Sign.countDocuments({
      status: "approved",
    });

    const totalContributedSigns = await Sign.countDocuments({
      addedBy: { $exists: true },
    });

    const totalSigns = await Sign.countDocuments();

    const totalCategories = await Category.countDocuments();

    res.status(200).json({
      status: "success",
      data: {
        totalApprovedSigns,
        totalContributedSigns,
        totalSigns,
        totalCategories,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getSignAddedByUser = async (req, res) => {
  try {
    const nonAdminUsers = await User.find({ isAdmin
      : false }); 
    const nonAdminUserIds = nonAdminUsers.map((user) => user._id);
    const signs = await Sign.find({
      addedBy: { $in: nonAdminUserIds },
    }).populate("addedBy");

    res.status(200).json({
      status: "success",
      dataLength: signs.length,
      data: signs,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getSignsAddedByAdmin = async (req, res) => {
  try {
    
    const adminUsers = await User.find({ isAdmin: true });
    const adminUserIds = adminUsers.map((user) => user._id);
    
    const signs = await Sign.find({
      addedBy: { $in: adminUserIds },
    }).populate("addedBy");

    res.status(200).json({
      status: "success",
      dataLength: signs.length,
      data: signs,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getAllSigns = async (req, res) => {
  try {
    const signs = await Sign.find();

    res.status(200).json({
      status: "success",
      dataLength: signs.length,
      data: signs,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getSign = async (req, res) => {
  try {
    const sign = await Sign.findById(req.params.id);
    if (!sign) {
      return res.status(404).json({
        status: "error",
        message: "Sign not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: sign,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.createSign = async (req, res) => {
  try {
    const sign = await Sign.create(req.body);
    res.status(201).json({
      status: "success",
      data: sign,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.updateSign = async (req, res) => {
  try {
    const sign = await Sign.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!sign) {
      return res.status(404).json({
        status: "error",
        message: "Sign not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: sign,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.deleteSign = async (req, res) => {
  try {
    const sign = await Sign.findByIdAndDelete(req.params.id);
    if (!sign) {
      return res.status(404).json({
        status: "error",
        message: "Sign not found",
      });
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.approveSign = async (req, res) => {
  try {
    const sign = await Sign.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );
    if (!sign) {
      return res.status(404).json({
        status: "error",
        message: "Sign not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: sign,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.rejectSign = async (req, res) => {
  try {
    const sign = await Sign.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );
    if (!sign) {
      return res.status(404).json({
        status: "error",
        message: "Sign not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: sign,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};
