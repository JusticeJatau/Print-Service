const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Transaction = require('../models/Transaction');
const generateOrderId = require('../utils/generateOrderId');
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Create new order
// @route   POST /api/orders
// @access  Public
const createOrder = asyncHandler(async (req, res) => {
  const { customerInfo, items, totalAmount, paymentReference } = req.body;
  
  const orderId = generateOrderId();
  
  const order = await Order.create({
    orderId,
    customerInfo,
    totalAmount,
    paymentReference,
    status: 'pending',
    paymentStatus: 'paid',
  });
  
  // Create order items
  for (const item of items) {
    await OrderItem.create({
      orderId: order._id,
      fileName: item.fileName,
      fileUrl: item.fileUrl,
      fileId: item.fileId,
      pages: item.pages,
      copies: item.copies,
      printType: item.printType,
      isDoubleSided: item.isDoubleSided,
      pricePerCopy: item.pricePerCopy,
      totalPrice: item.totalPrice,
    });
  }
  
  res.status(201).json({
    success: true,
    data: {
      orderId: order.orderId,
      order: order,
    },
  });
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Public
const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findOne({ orderId: req.params.id });
  
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }
  
  const items = await OrderItem.find({ orderId: order._id });
  
  res.json({
    success: true,
    data: {
      ...order.toObject(),
      items,
    },
  });
});

// @desc    Get orders by phone number
// @route   GET /api/orders/my-orders
// @access  Public
const getMyOrders = asyncHandler(async (req, res) => {
  const { phone } = req.query;
  
  if (!phone) {
    res.status(400);
    throw new Error('Phone number is required');
  }
  
  const orders = await Order.find({ 'customerInfo.phone': phone })
    .sort({ createdAt: -1 })
    .limit(20);
  
  res.json({ success: true, data: orders });
});

// @desc    Update order status (Admin only)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  
  const order = await Order.findOne({ orderId: req.params.id });
  
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }
  
  order.status = status;
  await order.save();
  
  res.json({ success: true, data: order });
});

module.exports = { createOrder, getOrder, getMyOrders, updateOrderStatus };