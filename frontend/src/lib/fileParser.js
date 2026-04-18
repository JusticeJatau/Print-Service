// File parsing utilities for extracting page counts and more

// Parse PDF file to get page count
export const parsePDFPages = async (file) => {
  return new Promise((resolve, reject) => {
    // In a real implementation, you would use a library like pdf.js
    // For now, this is a mock implementation
    const reader = new FileReader()
    
    reader.onload = async (e) => {
      try {
        // Mock page count - in reality, you'd parse the PDF
        // You can use pdf.js library for actual PDF parsing
        const mockPageCount = Math.floor(Math.random() * 50) + 1
        resolve(mockPageCount)
      } catch (error) {
        reject(error)
      }
    }
    
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsArrayBuffer(file)
  })
}

// Parse Word document to get page count
export const parseWordPages = async (file) => {
  return new Promise((resolve, reject) => {
    // In a real implementation, you would use mammoth.js or similar
    // For now, this is a mock implementation
    const reader = new FileReader()
    
    reader.onload = async (e) => {
      try {
        // Mock page count based on file size
        const mockPageCount = Math.max(1, Math.floor(file.size / 30000))
        resolve(Math.min(mockPageCount, 200))
      } catch (error) {
        reject(error)
      }
    }
    
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsArrayBuffer(file)
  })
}

// Get page count based on file type
export const getPageCount = async (file) => {
  const fileType = file.type
  
  if (fileType === 'application/pdf') {
    return await parsePDFPages(file)
  } else if (
    fileType === 'application/msword' || 
    fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    return await parseWordPages(file)
  } else {
    throw new Error('Unsupported file type')
  }
}

// Extract text from PDF (for preview)
export const extractPDFText = async (file, maxPages = 1) => {
  // This would use pdf.js to extract text
  // Mock implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Sample text extracted from PDF...')
    }, 500)
  })
}

// Convert Word to PDF (mock)
export const convertWordToPDF = async (file) => {
  // In a real app, this would send to backend for conversion
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Conversion would happen on backend'
      })
    }, 1000)
  })
}

// Validate file before upload
export const validateFileForPrinting = (file) => {
  const errors = []
  
  // Check file type
  const validTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
  
  if (!validTypes.includes(file.type)) {
    errors.push('Invalid file type. Please upload PDF or Word documents.')
  }
  
  // Check file size (50MB max)
  const maxSize = 50 * 1024 * 1024
  if (file.size > maxSize) {
    errors.push('File too large. Maximum size is 50MB.')
  }
  
  // Check file name for special characters
  const invalidChars = /[<>:"/\\|?*]/
  if (invalidChars.test(file.name)) {
    errors.push('File name contains invalid characters.')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export default {
  getPageCount,
  validateFileForPrinting,
  parsePDFPages,
  parseWordPages,
  extractPDFText,
  convertWordToPDF
}