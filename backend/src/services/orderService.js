const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Transaction = require('../models/Transaction');
const generateOrderId = require('../utils/generateOrderId');
const { sendOrderConfirmation, sendAdminNotification } = require('./emailService');

// Create order with items
const createFullOrder = async (orderData) => {
  const { customerInfo, items, totalAmount, paymentReference } = orderData;
  
  const orderId = generateOrderId();
  
  // Create order
  const order = await Order.create({
    orderId,
    customerInfo,
    totalAmount,
    paymentReference,
    status: 'pending',
    paymentStatus: 'paid',
  });
  
  // Create order items
  const orderItems = [];
  for (const item of items) {
    const orderItem = await OrderItem.create({
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
    orderItems.push(orderItem);
  }
  
  // Send email notifications
  await sendOrderConfirmation({
    orderId,
    customerInfo,
    items,
    totalAmount,
  });
  
  await sendAdminNotification({
    orderId,
    customerInfo,
    items,
    totalAmount,
  });
  
  return {
    order,
    items: orderItems,
  };
};

// Get order with items
const getOrderWithItems = async (orderId) => {
  const order = await Order.findOne({ orderId });
  if (!order) return null;
  
  const items = await OrderItem.find({ orderId: order._id });
  
  return {
    ...order.toObject(),
    items,
  };
};

// Get orders by phone
const getOrdersByPhone = async (phone) => {
  const orders = await Order.find({ 'customerInfo.phone': phone })
    .sort({ createdAt: -1 });
  
  const ordersWithItems = await Promise.all(
    orders.map(async (order) => {
      const items = await OrderItem.find({ orderId: order._id });
      return { ...order.toObject(), items };
    })
  );
  
  return ordersWithItems;
};

// Update order status
const updateOrderStatusService = async (orderId, status) => {
  const order = await Order.findOne({ orderId });
  if (!order) return null;
  
  order.status = status;
  await order.save();
  
  // Send status update email if customer has email
  if (order.customerInfo.email) {
    const { sendOrderStatusUpdate } = require('./emailService');
    await sendOrderStatusUpdate(
      orderId,
      order.customerInfo.email,
      order.customerInfo.name,
      status
    );
  }
  
  return order;
};

// Get order statistics
const getOrderStats = async () => {
  const totalOrders = await Order.countDocuments();
  const pendingOrders = await Order.countDocuments({ status: 'pending' });
  const printingOrders = await Order.countDocuments({ status: 'printing' });
  const readyOrders = await Order.countDocuments({ status: 'ready' });
  const completedOrders = await Order.countDocuments({ status: 'completed' });
  
  const orders = await Order.find();
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  
  return {
    totalOrders,
    pendingOrders,
    printingOrders,
    readyOrders,
    completedOrders,
    totalRevenue,
  };
};

module.exports = {
  createFullOrder,
  getOrderWithItems,
  getOrdersByPhone,
  updateOrderStatusService,
  getOrderStats,
};