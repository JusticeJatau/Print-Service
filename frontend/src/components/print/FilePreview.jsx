import React from 'react'
import { formatFileSize } from '../../lib/utils'

function FilePreview({ file, pages, onClear }) {
  if (!file) return null
  
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          {/* File Icon */}
          <div className="bg-blue-100 rounded-lg p-2">
            {file.type.includes('pdf') ? (
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            ) : (
              <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            )}
          </div>
          
          {/* File Info */}
          <div>
            <h4 className="font-medium text-gray-900">{file.name}</h4>
            <div className="text-sm text-gray-500 space-x-2">
              <span>{formatFileSize(file.size)}</span>
              {pages > 0 && (
                <>
                  <span>•</span>
                  <span>{pages} pages</span>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Clear Button */}
        <button
          onClick={onClear}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default FilePreview