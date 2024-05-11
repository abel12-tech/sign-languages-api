const mongoose = require("mongoose");

const signSchema = new mongoose.Schema({
  image: {
    type: String,
    require: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    require: true,
  },
  meaning: {
    type: String,
    require: true,
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved"],
    default: "pending",
  },
});

const Sign = mongoose.model("Sign", signSchema);

module.exports = Sign;
