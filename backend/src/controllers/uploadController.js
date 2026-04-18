const File = require('../models/File');
const parsePDFPages = require('../services/pdfParser');
const parseWordPages = require('../services/wordParser');
const { uploadFile } = require('../services/backblazeService');
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Upload file for printing
// @route   POST /api/upload
// @access  Public
const uploadPrintFile = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('No file uploaded');
  }
  
  // Count pages based on file type
  let pageCount = 0;
  
  if (req.file.mimetype === 'application/pdf') {
    pageCount = await parsePDFPages(req.file.buffer);
  } else {
    pageCount = await parseWordPages(req.file.buffer);
  }
  
  // Upload to Backblaze
  const uploadResult = await uploadFile(
    req.file.buffer,
    req.file.originalname,
    'prints'
  );
  
  // Save file record
  const file = await File.create({
    originalName: req.file.originalname,
    fileName: uploadResult.fileName,
    fileId: uploadResult.fileId,
    fileUrl: uploadResult.fileUrl,
    fileSize: req.file.size,
    mimeType: req.file.mimetype,
    pageCount: pageCount,
    folder: 'prints',
  });
  
  res.json({
    success: true,
    data: {
      fileId: file._id,
      fileName: file.originalName,
      fileUrl: file.fileUrl,
      pageCount: file.pageCount,
      fileSize: file.fileSize,
    },
  });
});

// @desc    Get file info
// @route   GET /api/upload/:id
// @access  Private/Admin
const getFileInfo = asyncHandler(async (req, res) => {
  const file = await File.findById(req.params.id);
  
  if (!file) {
    res.status(404);
    throw new Error('File not found');
  }
  
  res.json({ success: true, data: file });
});

module.exports = { uploadPrintFile, getFileInfo };