const axios = require('axios');
const Transaction = require('../models/Transaction');
const Order = require('../models/Order');

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_URL = 'https://api.paystack.co';

// Initialize payment with Paystack
const initializePayment = async (paymentData) => {
  try {
    const response = await axios.post(
      `${PAYSTACK_URL}/transaction/initialize`,
      {
        email: paymentData.email,
        amount: paymentData.amount * 100, // Convert to kobo
        currency: 'NGN',
        reference: paymentData.reference,
        metadata: {
          order_id: paymentData.orderId,
          customer_name: paymentData.customerName,
          customer_phone: paymentData.customerPhone,
        },
        callback_url: `${process.env.FRONTEND_URL}/payment/verify`,
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.status) {
      // Save transaction record
      await Transaction.create({
        orderId: paymentData.orderId,
        amount: paymentData.amount,
        reference: response.data.data.reference,
        status: 'pending',
        paymentMethod: 'paystack',
        metadata: {
          authorization_url: response.data.data.authorization_url,
          access_code: response.data.data.access_code,
        },
      });

      return {
        success: true,
        authorization_url: response.data.data.authorization_url,
        reference: response.data.data.reference,
        access_code: response.data.data.access_code,
      };
    } else {
      throw new Error(response.data.message || 'Payment initialization failed');
    }
  } catch (error) {
    console.error('Paystack initialization error:', error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || 'Payment initialization failed',
    };
  }
};

// Verify payment with Paystack
const verifyPayment = async (reference) => {
  try {
    const response = await axios.get(
      `${PAYSTACK_URL}/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET}`,
        },
      }
    );

    if (response.data.status) {
      const transaction = await Transaction.findOne({ reference });
      
      if (transaction) {
        transaction.status = 'success';
        transaction.paidAt = new Date();
        transaction.metadata = {
          ...transaction.metadata,
          verification_response: response.data.data,
        };
        await transaction.save();

        // Update order payment status
        await Order.findByIdAndUpdate(transaction.orderId, {
          paymentStatus: 'paid',
        });
      }

      return {
        success: true,
        status: response.data.data.status,
        amount: response.data.data.amount / 100,
        reference: response.data.data.reference,
        paidAt: response.data.data.paid_at,
        customer: {
          email: response.data.data.customer?.email,
          name: response.data.data.customer?.customer_name,
        },
      };
    } else {
      return {
        success: false,
        message: response.data.message || 'Verification failed',
      };
    }
  } catch (error) {
    console.error('Paystack verification error:', error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || 'Verification failed',
    };
  }
};

// Generate unique reference
const generateReference = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000000);
  return `PAY-${timestamp}-${random}`;
};

// Handle webhook event from Paystack
const handleWebhook = async (payload, signature) => {
  try {
    // Verify webhook signature (implement signature verification)
    const event = payload.event;
    
    if (event === 'charge.success') {
      const reference = payload.data.reference;
      
      const transaction = await Transaction.findOne({ reference });
      if (transaction && transaction.status === 'pending') {
        transaction.status = 'success';
        transaction.paidAt = new Date();
        transaction.metadata = {
          ...transaction.metadata,
          webhook_data: payload.data,
        };
        await transaction.save();
        
        // Update order
        await Order.findByIdAndUpdate(transaction.orderId, {
          paymentStatus: 'paid',
        });
        
        console.log(`Webhook: Payment successful for reference ${reference}`);
      }
    }
    
    return { success: true };
  } catch (error) {
    console.error('Webhook handling error:', error);
    return { success: false, error: error.message };
  }
};

// Refund payment
const refundPayment = async (reference, amount) => {
  try {
    const response = await axios.post(
      `${PAYSTACK_URL}/refund`,
      {
        transaction: reference,
        amount: amount * 100, // Convert to kobo
        currency: 'NGN',
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.status) {
      return {
        success: true,
        refundId: response.data.data.id,
        status: response.data.data.status,
      };
    } else {
      return {
        success: false,
        message: response.data.message || 'Refund failed',
      };
    }
  } catch (error) {
    console.error('Paystack refund error:', error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || 'Refund failed',
    };
  }
};

// Get transaction status
const getTransactionStatus = async (reference) => {
  try {
    const transaction = await Transaction.findOne({ reference });
    
    if (!transaction) {
      return {
        success: false,
        message: 'Transaction not found',
      };
    }
    
    return {
      success: true,
      status: transaction.status,
      amount: transaction.amount,
      reference: transaction.reference,
      paidAt: transaction.paidAt,
      createdAt: transaction.createdAt,
    };
  } catch (error) {
    console.error('Get transaction error:', error);
    return {
      success: false,
      message: error.message,
    };
  }
};

// List all transactions
const listTransactions = async (orderId = null) => {
  try {
    let query = {};
    if (orderId) {
      query.orderId = orderId;
    }
    
    const transactions = await Transaction.find(query)
      .sort({ createdAt: -1 })
      .populate('orderId', 'orderId customerInfo totalAmount');
    
    return {
      success: true,
      data: transactions,
    };
  } catch (error) {
    console.error('List transactions error:', error);
    return {
      success: false,
      message: error.message,
    };
  }
};

module.exports = {
  initializePayment,
  verifyPayment,
  generateReference,
  handleWebhook,
  refundPayment,
  getTransactionStatus,
  listTransactions,
};