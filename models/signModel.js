const mongoose = require('mongoose');

const signSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  meaning: {
    type: String,
    required: true
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    enum: ['pending', 'approved'],
    default: 'pending'
  }
});

const Sign = mongoose.model('Sign', signSchema);

module.exports = Sign;
