import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'
import { isValidFileType, formatFileSize, calculatePages } from '../../lib/utils'

function HandoutUploader({ onUpload }) {
  const [file, setFile] = useState(null)
  const [title, setTitle] = useState('')
  const [course, setCourse] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [pages, setPages] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  
  const onDrop = useCallback(async (acceptedFiles) => {
    const uploadedFile = acceptedFiles[0]
    if (isValidFileType(uploadedFile)) {
      setFile(uploadedFile)
      setIsUploading(true)
      const pageCount = await calculatePages(uploadedFile)
      setPages(pageCount)
      // Auto-calculate price based on pages (B&W rate)
      setPrice((pageCount * 5).toString())
      setIsUploading(false)
      toast.success(`File loaded: ${pageCount} pages`)
    } else {
      toast.error('Please upload PDF or Word document')
    }
  }, [])
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1,
    multiple: false
  })
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!file) {
      toast.error('Please upload a file')
      return
    }
    
    if (!title.trim()) {
      toast.error('Please enter a title')
      return
    }
    
    if (!course.trim()) {
      toast.error('Please enter a course name')
      return
    }
    
    const handoutData = {
      id: Date.now().toString(),
      title,
      course,
      description,
      pageCount: pages,
      price: parseInt(price),
      fileUrl: URL.createObjectURL(file),
      fileName: file.name
    }
    
    onUpload(handoutData)
    
    // Reset form
    setFile(null)
    setTitle('')
    setCourse('')
    setDescription('')
    setPrice('')
    setPages(0)
    toast.success('Handout uploaded successfully!')
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* File Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Handout File *
        </label>
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
            transition-all duration-200
            ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}
            ${file ? 'bg-green-50' : ''}
          `}
        >
          <input {...getInputProps()} />
          {file ? (
            <div>
              <svg className="w-10 h-10 text-green-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="font-medium text-gray-900">{file.name}</p>
              <p className="text-sm text-gray-500">{formatFileSize(file.size)} • {pages} pages</p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setFile(null)
                  setPages(0)
                }}
                className="mt-2 text-red-600 text-sm hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ) : (
            <div>
              <svg className="w-10 h-10 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-gray-600">
                Drag & drop or <span className="text-blue-600">browse</span>
              </p>
              <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX (Max 50MB)</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title *
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Introduction to Computer Science"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      
      {/* Course */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Course Code/Name *
        </label>
        <input
          type="text"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          placeholder="e.g., CS 101"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      
      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
          placeholder="Brief description of the handout..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      {/* Price */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Price (₦)
        </label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Auto-calculated based on pages"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        {pages > 0 && (
          <p className="text-xs text-gray-500 mt-1">
            Based on {pages} pages at ₦5/page
          </p>
        )}
      </div>
      
      <button
        type="submit"
        disabled={!file || isUploading}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isUploading ? 'Processing...' : 'Upload Handout'}
      </button>
    </form>
  )
}

export default HandoutUploader