const Sign = require("../models/signModel");

exports.getAllSigns = async (req, res) => {
  try {
    const signs = await Sign.find();

    res.status(200).json({
      status: "success",
      dataLength: signs.length,
      data: {
        signs,
      },
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
      data: {
        sign,
      },
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
      data: {
        sign,
      },
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
      data: {
        sign,
      },
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
    const sign = await Sign.findByIdAndUpdate(req.params.id, { status: "approved" }, { new: true });
    if (!sign) {
      return res.status(404).json({
        status: "error",
        message: "Sign not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        sign,
      },
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
    const sign = await Sign.findByIdAndUpdate(req.params.id, { status: "rejected" }, { new: true });
    if (!sign) {
      return res.status(404).json({
        status: "error",
        message: "Sign not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        sign,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};
