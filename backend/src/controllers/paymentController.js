const paymentService = require('../services/paymentService');
const orderService = require('../services/orderService');
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Initialize payment
// @route   POST /api/payments/initialize
// @access  Public
const initPayment = asyncHandler(async (req, res) => {
  const { email, amount, orderId, customerName, customerPhone } = req.body;
  
  const reference = paymentService.generateReference();
  
  const result = await paymentService.initializePayment({
    email,
    amount,
    orderId,
    customerName,
    customerPhone,
    reference,
  });
  
  if (result.success) {
    res.json({
      success: true,
      data: {
        authorization_url: result.authorization_url,
        reference: result.reference,
      },
    });
  } else {
    res.status(400);
    throw new Error(result.message);
  }
});

// @desc    Verify payment
// @route   GET /api/payments/verify/:reference
// @access  Public
const verifyPaymentStatus = asyncHandler(async (req, res) => {
  const { reference } = req.params;
  
  const result = await paymentService.verifyPayment(reference);
  
  if (result.success) {
    res.json({
      success: true,
      data: {
        status: result.status,
        amount: result.amount,
        reference: result.reference,
        paidAt: result.paidAt,
      },
    });
  } else {
    res.status(400);
    throw new Error(result.message);
  }
});

// @desc    Get transaction status
// @route   GET /api/payments/transaction/:reference
// @access  Private/Admin
const getTransactionStatus = asyncHandler(async (req, res) => {
  const { reference } = req.params;
  
  const result = await paymentService.getTransactionStatus(reference);
  
  if (result.success) {
    res.json({
      success: true,
      data: result,
    });
  } else {
    res.status(404);
    throw new Error(result.message);
  }
});

// @desc    List all transactions
// @route   GET /api/payments/transactions
// @access  Private/Admin
const listTransactions = asyncHandler(async (req, res) => {
  const { orderId } = req.query;
  
  const result = await paymentService.listTransactions(orderId);
  
  if (result.success) {
    res.json({
      success: true,
      data: result.data,
    });
  } else {
    res.status(400);
    throw new Error(result.message);
  }
});

module.exports = {
  initPayment,
  verifyPaymentStatus,
  getTransactionStatus,
  listTransactions,
};