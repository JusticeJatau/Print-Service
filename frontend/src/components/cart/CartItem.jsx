import React from 'react'
import { formatCurrency, truncateText } from '../../lib/utils'

function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-3">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Item Info */}
        <div className="flex-1">
          <h4 className="font-medium text-gray-900">
            {truncateText(item.fileName, 40)}
          </h4>
          <div className="text-sm text-gray-500 mt-1 space-x-2">
            <span>{item.pages} pages</span>
            <span>•</span>
            <span className={item.printType === 'color' ? 'text-purple-600' : 'text-gray-600'}>
              {item.printType === 'color' ? 'Color' : 'B&W'}
            </span>
            {item.isDoubleSided && (
              <>
                <span>•</span>
                <span className="text-green-600">Double-sided</span>
              </>
            )}
          </div>
        </div>
        
        {/* Quantity Controls */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onUpdateQuantity(item.id, item.copies - 1)}
            className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          
          <span className="w-12 text-center font-medium">{item.copies}</span>
          
          <button
            onClick={() => onUpdateQuantity(item.id, item.copies + 1)}
            className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
        
        {/* Price and Remove */}
        <div className="flex items-center justify-between md:justify-end gap-4">
          <div className="text-right">
            <div className="font-semibold text-gray-900">
              {formatCurrency(item.totalPrice)}
            </div>
            <div className="text-xs text-gray-500">
              {formatCurrency(item.pricePerCopy)}/copy
            </div>
          </div>
          
          <button
            onClick={() => onRemove(item.id)}
            className="text-red-500 hover:text-red-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartItem