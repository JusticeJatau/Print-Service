const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: 'NGN',
  },
  reference: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ['pending', 'success', 'failed'],
    default: 'pending',
  },
  paymentMethod: {
    type: String,
    default: 'paystack',
  },
  paidAt: {
    type: Date,
  },
  metadata: {
    type: Object,
    default: {},
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Transaction', TransactionSchema);