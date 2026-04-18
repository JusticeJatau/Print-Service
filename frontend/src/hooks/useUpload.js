import { useState, useCallback } from 'react'
import toast from 'react-hot-toast'
import { isValidFileType, calculatePages, formatFileSize } from '../lib/utils'

function useUpload() {
  const [file, setFile] = useState(null)
  const [pages, setPages] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(null)

  const validateFile = useCallback((file) => {
    // Check file type
    if (!isValidFileType(file)) {
      throw new Error('Invalid file type. Please upload PDF or Word documents only.')
    }

    // Check file size (max 50MB)
    const maxSize = 50 * 1024 * 1024 // 50MB
    if (file.size > maxSize) {
      throw new Error('File too large. Maximum size is 50MB.')
    }

    return true
  }, [])

  const uploadFile = useCallback(async (selectedFile) => {
    setError(null)
    setIsUploading(true)
    setProgress(0)

    try {
      // Validate file
      validateFile(selectedFile)

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      // Calculate pages (simulate processing)
      const pageCount = await calculatePages(selectedFile)
      
      clearInterval(progressInterval)
      setProgress(100)

      setFile(selectedFile)
      setPages(pageCount)
      
      toast.success(`File uploaded! Found ${pageCount} pages`)
      
      return { file: selectedFile, pages: pageCount }
    } catch (err) {
      setError(err.message)
      toast.error(err.message)
      return null
    } finally {
      setIsUploading(false)
      setTimeout(() => setProgress(0), 1000)
    }
  }, [validateFile])

  const clearFile = useCallback(() => {
    setFile(null)
    setPages(0)
    setError(null)
    setProgress(0)
  }, [])

  return {
    file,
    pages,
    isUploading,
    progress,
    error,
    uploadFile,
    clearFile,
    fileInfo: file ? {
      name: file.name,
      size: formatFileSize(file.size),
      type: file.type
    } : null
  }
}

export default useUpload