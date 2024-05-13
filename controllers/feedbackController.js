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
exports.updateFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;

    const feedback = await Feedback.findById(id);
    if (!feedback) {
      return res.status(404).json({
        status: "error",
        message: "Feedback not found",
      });
    }

    feedback.message = message;
    await feedback.save();

    res.status(200).json({
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

exports.deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;

    const feedback = await Feedback.findByIdAndDelete(id);
    if (!feedback) {
      return res.status(404).json({
        status: "error",
        message: "Feedback not found",
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
