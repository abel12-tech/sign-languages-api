const Feedback = require("../models/feedbackModel");

exports.createFeedback = async (req, res) => {
  try {
    const userId = req.userId;

    req.body.addedBy = userId;

    const feedback = await Feedback.create(req.body);

    res.status(201).json({
      status: "success",
      data: feedback,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getAllFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find().populate(
      "addedBy",
      "firstName lastName"
    );
    res.status(200).json({
      status: "success",
      data: feedback,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
