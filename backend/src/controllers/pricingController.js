const Pricing = require('../models/Pricing');
const asyncHandler = require('../middleware/asyncHandler');
const { calculatePrintPrice, getPriceBreakdown } = require('../utils/calculatePrice');

// @desc    Get current pricing
// @route   GET /api/pricing
// @access  Public
const getPricing = asyncHandler(async (req, res) => {
  let pricing = await Pricing.findOne();
  
  if (!pricing) {
    // Create default pricing if none exists
    pricing = await Pricing.create({});
  }
  
  res.json({ success: true, data: pricing });
});

// @desc    Calculate price for print job
// @route   POST /api/pricing/calculate
// @access  Public
const calculatePrice = asyncHandler(async (req, res) => {
  const { pages, copies, printType, isDoubleSided } = req.body;
  
  const pricing = await Pricing.findOne();
  if (!pricing) {
    res.status(404);
    throw new Error('Pricing settings not found');
  }
  
  const total = calculatePrintPrice(pages, copies, printType, isDoubleSided, pricing);
  const breakdown = getPriceBreakdown(pages, copies, printType, isDoubleSided, pricing);
  
  res.json({
    success: true,
    data: {
      total,
      breakdown,
    },
  });
});

// @desc    Update pricing (Admin only)
// @route   PUT /api/pricing
// @access  Private/Admin
const updatePricing = asyncHandler(async (req, res) => {
  const { blackAndWhite, color, discounts } = req.body;
  
  let pricing = await Pricing.findOne();
  
  if (!pricing) {
    pricing = new Pricing({});
  }
  
  if (blackAndWhite) {
    pricing.blackAndWhite = { ...pricing.blackAndWhite, ...blackAndWhite };
  }
  
  if (color) {
    pricing.color = { ...pricing.color, ...color };
  }
  
  if (discounts) {
    pricing.discounts = { ...pricing.discounts, ...discounts };
  }
  
  pricing.updatedBy = req.user.name;
  await pricing.save();
  
  res.json({ success: true, data: pricing });
});

module.exports = { getPricing, calculatePrice, updatePricing };