import React from 'react'
import { formatCurrency } from '../../lib/utils'

function SummaryCard({ 
  pages, 
  copies, 
  printType, 
  isDoubleSided,
  totalPrice,
  onAddToCart,
  isUploading 
}) {
  const pricePerPage = printType === 'color' ? 20 : 5
  const subtotal = pages * copies * pricePerPage
  let discount = 0
  
  if (isDoubleSided) {
    discount = subtotal * 0.1 // 10% discount
  }
  
  const finalTotal = subtotal - discount
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
      
      <div className="space-y-3">
        {/* Price Breakdown */}
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">
            {pages} pages × {copies} copies
          </span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        
        {isDoubleSided && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Double-sided discount (10%)</span>
            <span>-{formatCurrency(discount)}</span>
          </div>
        )}
        
        {/* Divider */}
        <div className="border-t border-gray-200 my-3"></div>
        
        {/* Total */}
        <div className="flex justify-between items-center">
          <span className="text-base font-semibold text-gray-900">Total</span>
          <span className="text-2xl font-bold text-blue-600">
            {formatCurrency(finalTotal)}
          </span>
        </div>
        
        {/* Price per page note */}
        <p className="text-xs text-gray-500 text-center">
          {printType === 'color' ? 'Color' : 'Black & White'} printing • 
          {isDoubleSided ? ' Double-sided' : ' Single-sided'}
        </p>
        
        {/* Add to Cart Button */}
        <button
          onClick={onAddToCart}
          disabled={pages === 0 || isUploading}
          className="
            w-full bg-blue-600 text-white py-3 rounded-lg font-medium
            hover:bg-blue-700 transition-colors
            disabled:opacity-50 disabled:cursor-not-allowed
            mt-4
          "
        >
          {isUploading ? 'Processing...' : 'Add to Cart'}
        </button>
        
        {/* Note */}
        <p className="text-xs text-gray-400 text-center mt-3">
          You can review your order before payment
        </p>
      </div>
    </div>
  )
}

export default SummaryCard