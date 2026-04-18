const Order = require('../models/Order');
const { sendOrderStatusUpdate } = require('../services/emailService');
const cron = require('node-cron');

// Check for pending orders and send reminders
const checkPendingOrdersReminder = async () => {
  try {
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
    
    const pendingOrders = await Order.find({
      status: 'pending',
      createdAt: { $lt: twentyFourHoursAgo },
      'customerInfo.email': { $ne: '' },
    });
    
    for (const order of pendingOrders) {
      await sendOrderStatusUpdate(
        order.orderId,
        order.customerInfo.email,
        order.customerInfo.name,
        'pending_reminder'
      );
      console.log(`Reminder sent for order ${order.orderId}`);
    }
    
    return { reminderCount: pendingOrders.length };
  } catch (error) {
    console.error('Pending orders reminder error:', error);
    return { reminderCount: 0, error: error.message };
  }
};

// Check for ready orders that haven't been picked up
const checkReadyOrdersReminder = async () => {
  try {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    
    const readyOrders = await Order.find({
      status: 'ready',
      updatedAt: { $lt: threeDaysAgo },
      'customerInfo.email': { $ne: '' },
    });
    
    for (const order of readyOrders) {
      await sendOrderStatusUpdate(
        order.orderId,
        order.customerInfo.email,
        order.customerInfo.name,
        'pickup_reminder'
      );
      console.log(`Pickup reminder sent for order ${order.orderId}`);
    }
    
    return { reminderCount: readyOrders.length };
  } catch (error) {
    console.error('Ready orders reminder error:', error);
    return { reminderCount: 0, error: error.message };
  }
};

// Schedule notification jobs
const scheduleNotificationJobs = () => {
  // Run every 6 hours
  cron.schedule('0 */6 * * *', async () => {
    console.log('🕐 Running notification jobs...');
    await checkPendingOrdersReminder();
    await checkReadyOrdersReminder();
  });
  
  console.log('✅ Notification jobs scheduled (every 6 hours)');
};

// Run all notifications now
const runAllNotificationsNow = async () => {
  console.log('🕐 Running manual notifications...');
  const pending = await checkPendingOrdersReminder();
  const ready = await checkReadyOrdersReminder();
  return { pending, ready };
};

module.exports = {
  checkPendingOrdersReminder,
  checkReadyOrdersReminder,
  scheduleNotificationJobs,
  runAllNotificationsNow,
};