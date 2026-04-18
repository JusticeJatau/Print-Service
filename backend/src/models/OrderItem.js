const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    default: '',
  },
  fileId: {
    type: String,
    default: '',
  },
  pages: {
    type: Number,
    required: true,
  },
  copies: {
    type: Number,
    required: true,
    default: 1,
  },
  printType: {
    type: String,
    enum: ['blackAndWhite', 'color'],
    default: 'blackAndWhite',
  },
  isDoubleSided: {
    type: Boolean,
    default: false,
  },
  pricePerCopy: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('OrderItem', OrderItemSchema);