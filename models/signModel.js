const mongoose = require("mongoose");

const signSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  meaning: {
    type: String,
    required: true,
  },
});

const Sign = mongoose.model("Sign", signSchema);

module.exports = Sign;
