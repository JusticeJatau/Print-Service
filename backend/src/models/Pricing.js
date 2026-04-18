const mongoose = require('mongoose');

const PricingSchema = new mongoose.Schema({
  blackAndWhite: {
    perPage: { type: Number, default: 5 },
    doubleSidedDiscount: { type: Number, default: 0.1 },
  },
  color: {
    perPage: { type: Number, default: 20 },
    doubleSidedDiscount: { type: Number, default: 0.1 },
  },
  discounts: {
    bulkOrder: {
      threshold: { type: Number, default: 50 },
      discount: { type: Number, default: 0.15 },
    },
    studentDiscount: { type: Number, default: 0.05 },
  },
  updatedBy: {
    type: String,
    default: 'admin',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Pricing', PricingSchema);