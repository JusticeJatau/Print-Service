const Handout = require('../models/Handout');
const { uploadFile, deleteFile } = require('../services/backblazeService');
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Get all handouts
// @route   GET /api/handouts
// @access  Public
const getHandouts = asyncHandler(async (req, res) => {
  const { course, search } = req.query;
  
  let query = { isActive: true };
  
  if (course) {
    query.course = course;
  }
  
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { course: { $regex: search, $options: 'i' } },
    ];
  }
  
  const handouts = await Handout.find(query).sort({ createdAt: -1 });
  
  res.json({ success: true, data: handouts });
});

// @desc    Get single handout
// @route   GET /api/handouts/:id
// @access  Public
const getHandout = asyncHandler(async (req, res) => {
  const handout = await Handout.findById(req.params.id);
  
  if (!handout) {
    res.status(404);
    throw new Error('Handout not found');
  }
  
  res.json({ success: true, data: handout });
});

// @desc    Create handout (Admin only)
// @route   POST /api/handouts
// @access  Private/Admin
const createHandout = asyncHandler(async (req, res) => {
  const { title, course, description, pageCount, price } = req.body;
  
  if (!req.file) {
    res.status(400);
    throw new Error('No file uploaded');
  }
  
  // Upload to Backblaze
  const uploadResult = await uploadFile(
    req.file.buffer,
    req.file.originalname,
    'handouts'
  );
  
  const handout = await Handout.create({
    title,
    course,
    description,
    pageCount,
    price,
    fileUrl: uploadResult.fileUrl,
    fileId: uploadResult.fileId,
    fileName: uploadResult.fileName,
  });
  
  res.status(201).json({ success: true, data: handout });
});

// @desc    Update handout (Admin only)
// @route   PUT /api/handouts/:id
// @access  Private/Admin
const updateHandout = asyncHandler(async (req, res) => {
  const handout = await Handout.findById(req.params.id);
  
  if (!handout) {
    res.status(404);
    throw new Error('Handout not found');
  }
  
  const { title, course, description, price, isActive } = req.body;
  
  if (title) handout.title = title;
  if (course) handout.course = course;
  if (description) handout.description = description;
  if (price) handout.price = price;
  if (isActive !== undefined) handout.isActive = isActive;
  
  await handout.save();
  
  res.json({ success: true, data: handout });
});

// @desc    Delete handout (Admin only)
// @route   DELETE /api/handouts/:id
// @access  Private/Admin
const deleteHandout = asyncHandler(async (req, res) => {
  const handout = await Handout.findById(req.params.id);
  
  if (!handout) {
    res.status(404);
    throw new Error('Handout not found');
  }
  
  // Delete from Backblaze
  await deleteFile(handout.fileId, handout.fileName);
  
  await handout.deleteOne();
  
  res.json({ success: true, message: 'Handout deleted' });
});

module.exports = {
  getHandouts,
  getHandout,
  createHandout,
  updateHandout,
  deleteHandout,
};