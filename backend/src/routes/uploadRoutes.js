const express = require('express');
const { uploadPrintFile, getFileInfo } = require('../controllers/uploadController');
const upload = require('../config/multer');
const validateFile = require('../middleware/fileValidation');
const { protect, adminAuth } = require('../middleware/auth');
const router = express.Router();

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload a file for printing
 *     tags: [Upload]
 *     description: Upload PDF or Word document. File will be analyzed for page count and stored in Backblaze B2.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: PDF, DOC, or DOCX file (max 50MB)
 *               orderId:
 *                 type: string
 *                 description: Optional order ID to associate file with
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     fileId:
 *                       type: string
 *                       example: 507f1f77bcf86cd799439011
 *                     fileName:
 *                       type: string
 *                       example: my_document.pdf
 *                     fileUrl:
 *                       type: string
 *                       example: https://backblazeb2.com/prints/file.pdf
 *                     pageCount:
 *                       type: number
 *                       example: 25
 *                     fileSize:
 *                       type: number
 *                       example: 1048576
 *       400:
 *         description: No file uploaded or invalid file type
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       413:
 *         description: File too large (max 50MB)
 *       415:
 *         description: Unsupported file type
 *       500:
 *         description: Upload or processing error
 *     example:
 *       request:
 *         file: document.pdf
 *       response:
 *         success: true
 *         data:
 *           fileId: "507f1f77bcf86cd799439011"
 *           fileName: "lecture_notes.pdf"
 *           pageCount: 45
 *           fileSize: 2048000
 */
router.post('/', upload.single('file'), validateFile, uploadPrintFile);

/**
 * @swagger
 * /upload/{id}:
 *   get:
 *     summary: Get file information (Admin only)
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: File ID
 *         example: 507f1f77bcf86cd799439011
 *     responses:
 *       200:
 *         description: File information retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     originalName:
 *                       type: string
 *                     fileName:
 *                       type: string
 *                     fileUrl:
 *                       type: string
 *                     fileSize:
 *                       type: number
 *                     mimeType:
 *                       type: string
 *                     pageCount:
 *                       type: number
 *                     folder:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       401:
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Not authorized (Admin only)
 *       404:
 *         description: File not found
 */
router.get('/:id', protect, adminAuth, getFileInfo);

module.exports = router;