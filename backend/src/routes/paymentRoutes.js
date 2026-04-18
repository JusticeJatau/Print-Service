const express = require('express');
const { 
  initPayment, 
  verifyPaymentStatus,
  getTransactionStatus,
  listTransactions,
} = require('../controllers/paymentController');
const { protect, adminAuth } = require('../middleware/auth');
const router = express.Router();

/**
 * @swagger
 * /payments/initialize:
 *   post:
 *     summary: Initialize Paystack payment
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - amount
 *               - orderId
 *               - customerName
 *             properties:
 *               email:
 *                 type: string
 *                 example: customer@example.com
 *               amount:
 *                 type: number
 *                 example: 5000
 *               orderId:
 *                 type: string
 *                 example: PRINT-123456-789
 *               customerName:
 *                 type: string
 *                 example: John Doe
 *               customerPhone:
 *                 type: string
 *                 example: 08012345678
 *     responses:
 *       200:
 *         description: Payment initialized successfully
 */
router.post('/initialize', initPayment);

/**
 * @swagger
 * /payments/verify/{reference}:
 *   get:
 *     summary: Verify Paystack payment
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: reference
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment verified successfully
 */
router.get('/verify/:reference', verifyPaymentStatus);

/**
 * @swagger
 * /payments/transaction/{reference}:
 *   get:
 *     summary: Get transaction status (Admin only)
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reference
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transaction details
 */
router.get('/transaction/:reference', protect, adminAuth, getTransactionStatus);

/**
 * @swagger
 * /payments/transactions:
 *   get:
 *     summary: List all transactions (Admin only)
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: orderId
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of transactions
 */
router.get('/transactions', protect, adminAuth, listTransactions);

module.exports = router;