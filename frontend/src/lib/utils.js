// Format currency
export const formatCurrency = (amount, currency = '₦') => {
  return `${currency}${amount.toLocaleString()}`
}

// Format date
export const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-NG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Generate random order ID
export const generateOrderId = () => {
  const prefix = 'PRINT'
  const timestamp = Date.now().toString().slice(-6)
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `${prefix}-${timestamp}-${random}`
}

// Validate file type
export const isValidFileType = (file, allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']) => {
  return allowedTypes.includes(file.type)
}

// Get file extension
export const getFileExtension = (filename) => {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2)
}

// Format file size
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Debounce function for search/input
export const debounce = (func, delay) => {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

// Truncate text
export const truncateText = (text, maxLength = 50) => {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

// Calculate pages from file (mock for now)
export const calculatePages = async (file) => {
  // This is a mock - in real app you'd parse the file
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock page count between 1-100 pages
      const mockPages = Math.floor(Math.random() * 100) + 1
      resolve(mockPages)
    }, 1000)
  })
}

// Validate email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate phone number (Nigeria format)
export const isValidPhone = (phone) => {
  const phoneRegex = /^[0-9]{11}$/
  return phoneRegex.test(phone)
}