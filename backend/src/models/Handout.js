const mongoose = require('mongoose');

const HandoutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  pageCount: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  fileId: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  downloads: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Handout', HandoutSchema);