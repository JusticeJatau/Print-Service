const formatCurrency = (amount, currency = '₦') => {
  return `${currency}${amount.toLocaleString()}`;
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-NG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhone = (phone) => {
  const phoneRegex = /^[0-9]{11}$/;
  return phoneRegex.test(phone);
};

const getFileExtension = (filename) => {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
};

module.exports = {
  formatCurrency,
  formatDate,
  isValidEmail,
  isValidPhone,
  getFileExtension,
};