const express = require('express');
const {
  getHandouts,
  getHandout,
  createHandout,
  updateHandout,
  deleteHandout,
} = require('../controllers/handoutController');
const upload = require('../config/multer');
const { protect, adminAuth } = require('../middleware/auth');
const router = express.Router();

/**
 * @swagger
 * /handouts:
 *   get:
 *     summary: Get all handouts
 *     tags: [Handouts]
 *     parameters:
 *       - in: query
 *         name: course
 *         schema:
 *           type: string
 *         description: Filter by course
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by title or course
 *     responses:
 *       200:
 *         description: List of handouts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Handout'
 */
router.get('/', getHandouts);

/**
 * @swagger
 * /handouts/{id}:
 *   get:
 *     summary: Get single handout
 *     tags: [Handouts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Handout details
 *       404:
 *         description: Handout not found
 */
router.get('/:id', getHandout);

/**
 * @swagger
 * /handouts:
 *   post:
 *     summary: Upload new handout (Admin only)
 *     tags: [Handouts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               title:
 *                 type: string
 *               course:
 *                 type: string
 *               description:
 *                 type: string
 *               pageCount:
 *                 type: number
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Handout uploaded
 */
router.post('/', protect, adminAuth, upload.single('file'), createHandout);

/**
 * @swagger
 * /handouts/{id}:
 *   put:
 *     summary: Update handout (Admin only)
 *     tags: [Handouts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Handout updated
 */
router.put('/:id', protect, adminAuth, updateHandout);

/**
 * @swagger
 * /handouts/{id}:
 *   delete:
 *     summary: Delete handout (Admin only)
 *     tags: [Handouts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Handout deleted
 */
router.delete('/:id', protect, adminAuth, deleteHandout);

module.exports = router;