const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  originalName: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  fileId: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  fileSize: {
    type: Number,
    required: true,
  },
  mimeType: {
    type: String,
    required: true,
  },
  pageCount: {
    type: Number,
    default: 0,
  },
  folder: {
    type: String,
    enum: ['prints', 'handouts'],
    default: 'prints',
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('File', FileSchema);