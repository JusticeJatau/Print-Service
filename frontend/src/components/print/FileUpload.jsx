import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { isValidFileType, formatFileSize } from '../../lib/utils'

function FileUpload({ onFileUpload, isUploading }) {
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      const error = rejectedFiles[0].errors[0]
      alert(`File rejected: ${error.message}`)
      return
    }
    
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]
      if (isValidFileType(file)) {
        onFileUpload(file)
      } else {
        alert('Please upload PDF or Word documents only')
      }
    }
  }, [onFileUpload])
  
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
  
  return (
    <div
      {...getRootProps()}
      className={`
        border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
        transition-all duration-200
        ${isDragActive 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
        }
        ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      <input {...getInputProps()} disabled={isUploading} />
      
      <div className="flex flex-col items-center space-y-3">
        {/* Upload Icon */}
        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        
        {/* Text */}
        {isDragActive ? (
          <p className="text-blue-600 font-medium">Drop your file here...</p>
        ) : (
          <>
            <p className="text-gray-600">
              Drag & drop your file here, or <span className="text-blue-600">browse</span>
            </p>
            <p className="text-sm text-gray-400">
              Supports: PDF, DOC, DOCX (Max 50MB)
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default FileUpload