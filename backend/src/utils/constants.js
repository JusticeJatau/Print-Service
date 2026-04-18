module.exports = {
  ORDER_STATUS: {
    PENDING: 'pending',
    PRINTING: 'printing',
    READY: 'ready',
    COMPLETED: 'completed',
  },
  
  PAYMENT_STATUS: {
    PENDING: 'pending',
    PAID: 'paid',
    FAILED: 'failed',
  },
  
  PRINT_TYPES: {
    BLACK_WHITE: 'blackAndWhite',
    COLOR: 'color',
  },
  
  USER_ROLES: {
    STUDENT: 'student',
    ADMIN: 'admin',
  },
  
  FILE_TYPES: {
    PDF: 'application/pdf',
    DOC: 'application/msword',
    DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  },
  
  MAX_FILE_SIZE: 50 * 1024 * 1024, // 50MB
  
  CURRENCY: 'NGN',
};