const express = require('express');
const { getPricing, calculatePrice, updatePricing } = require('../controllers/pricingController');
const { protect, adminAuth } = require('../middleware/auth');
const router = express.Router();

/**
 * @swagger
 * /pricing:
 *   get:
 *     summary: Get current pricing settings
 *     tags: [Pricing]
 *     responses:
 *       200:
 *         description: Current pricing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Pricing'
 */
router.get('/', getPricing);

/**
 * @swagger
 * /pricing/calculate:
 *   post:
 *     summary: Calculate print price
 *     tags: [Pricing]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pages
 *               - copies
 *               - printType
 *             properties:
 *               pages:
 *                 type: number
 *                 example: 10
 *               copies:
 *                 type: number
 *                 example: 2
 *               printType:
 *                 type: string
 *                 enum: [blackAndWhite, color]
 *               isDoubleSided:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Price calculated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: number
 *                     breakdown:
 *                       type: object
 */
router.post('/calculate', calculatePrice);

/**
 * @swagger
 * /pricing:
 *   put:
 *     summary: Update pricing (Admin only)
 *     tags: [Pricing]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Pricing updated
 */
router.put('/', protect, adminAuth, updatePricing);

module.exports = router;