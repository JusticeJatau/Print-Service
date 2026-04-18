const validateOrderInput = (data) => {
  const errors = [];
  
  if (!data.customerInfo?.name || data.customerInfo.name.trim() === '') {
    errors.push('Customer name is required');
  }
  
  if (!data.customerInfo?.phone || !/^[0-9]{11}$/.test(data.customerInfo.phone)) {
    errors.push('Valid phone number is required (11 digits)');
  }
  
  if (data.customerInfo?.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.customerInfo.email)) {
    errors.push('Invalid email format');
  }
  
  if (!data.items || data.items.length === 0) {
    errors.push('At least one item is required');
  }
  
  if (!data.totalAmount || data.totalAmount <= 0) {
    errors.push('Invalid total amount');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

const validateHandoutInput = (data) => {
  const errors = [];
  
  if (!data.title || data.title.trim() === '') {
    errors.push('Title is required');
  }
  
  if (!data.course || data.course.trim() === '') {
    errors.push('Course name is required');
  }
  
  if (!data.pageCount || data.pageCount <= 0) {
    errors.push('Valid page count is required');
  }
  
  if (!data.price || data.price <= 0) {
    errors.push('Valid price is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

module.exports = {
  validateOrderInput,
  validateHandoutInput,
};