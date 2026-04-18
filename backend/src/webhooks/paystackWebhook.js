const Transaction = require('../models/Transaction');
const Order = require('../models/Order');

const handlePaystackWebhook = async (req, res) => {
  const event = req.body;
  
  // Verify webhook signature (implement signature verification)
  
  if (event.event === 'charge.success') {
    const reference = event.data.reference;
    
    const transaction = await Transaction.findOne({ reference });
    if (transaction && transaction.status === 'pending') {
      transaction.status = 'success';
      transaction.paidAt = new Date();
      await transaction.save();
      
      await Order.findByIdAndUpdate(transaction.orderId, {
        paymentStatus: 'paid',
      });
    }
  }
  
  res.sendStatus(200);
};

module.exports = handlePaystackWebhook;