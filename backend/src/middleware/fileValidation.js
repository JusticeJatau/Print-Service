const validateFile = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'No file uploaded',
    });
  }

  const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  
  if (!allowedTypes.includes(req.file.mimetype)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid file type. Only PDF, DOC, and DOCX are allowed.',
    });
  }

  const maxSize = 50 * 1024 * 1024; // 50MB
  if (req.file.size > maxSize) {
    return res.status(400).json({
      success: false,
      message: 'File too large. Maximum size is 50MB.',
    });
  }

  next();
};

module.exports = validateFile;