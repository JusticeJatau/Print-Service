const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const User = require('../models/User');
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Get admin dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
const getStats = asyncHandler(async (req, res) => {
  const totalOrders = await Order.countDocuments();
  const pendingOrders = await Order.countDocuments({ status: 'pending' });
  const printingOrders = await Order.countDocuments({ status: 'printing' });
  const readyOrders = await Order.countDocuments({ status: 'ready' });
  
  const orders = await Order.find();
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  
  res.json({
    success: true,
    data: {
      totalOrders,
      pendingOrders,
      printingOrders,
      readyOrders,
      totalRevenue,
    },
  });
});

// @desc    Get all orders (Admin)
// @route   GET /api/admin/orders
// @access  Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 20 } = req.query;
  
  let query = {};
  if (status && status !== 'all') {
    query.status = status;
  }
  
  const orders = await Order.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));
  
  const total = await Order.countDocuments(query);
  
  // Get items for each order
  const ordersWithItems = await Promise.all(
    orders.map(async (order) => {
      const items = await OrderItem.find({ orderId: order._id });
      return {
        ...order.toObject(),
        items,
      };
    })
  );
  
  res.json({
    success: true,
    data: {
      orders: ordersWithItems,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
    },
  });
});

// @desc    Get single order details (Admin)
// @route   GET /api/admin/orders/:id
// @access  Private/Admin
const getOrderDetails = asyncHandler(async (req, res) => {
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

// @desc    Update order status (Admin)
// @route   PUT /api/admin/orders/:id/status
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
  
  res.json({
    success: true,
    data: order,
  });
});

// @desc    Get all users (Admin)
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password');
  res.json({ success: true, data: users });
});

module.exports = {
  getStats,
  getAllOrders,
  getOrderDetails,
  updateOrderStatus,
  getAllUsers,
};