const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  customerInfo: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, default: '' },
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'printing', 'ready', 'completed'],
    default: 'pending',
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending',
  },
  paymentReference: {
    type: String,
    default: '',
  },
  pickupLocation: {
    type: String,
    default: 'Campus Café',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Order', OrderSchema);