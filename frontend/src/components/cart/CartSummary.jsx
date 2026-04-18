import React from 'react'
import { Link } from 'react-router-dom'
import { formatCurrency } from '../../lib/utils'

function CartSummary({ items, totalAmount, onClearCart }) {
  const itemCount = items.reduce((sum, item) => sum + item.copies, 0)
  
  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M17 13l1.5 6M9 21h6M12 21v-6" />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
        <p className="text-gray-500 mb-4">Add some print jobs to get started</p>
        <Link
          to="/print"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Start Printing
        </Link>
      </div>
    )
  }
  
  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 sticky top-24">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Items ({itemCount} copies)</span>
          <span className="font-medium">{formatCurrency(totalAmount)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Service fee</span>
          <span className="font-medium">{formatCurrency(0)}</span>
        </div>
        
        <div className="border-t border-gray-200 my-3 pt-3">
          <div className="flex justify-between items-center">
            <span className="text-base font-semibold text-gray-900">Total</span>
            <span className="text-2xl font-bold text-blue-600">
              {formatCurrency(totalAmount)}
            </span>
          </div>
        </div>
        
        <Link to="/checkout">
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Proceed to Checkout
          </button>
        </Link>
        
        <button
          onClick={onClearCart}
          className="w-full text-red-600 py-2 text-sm hover:text-red-700 transition-colors"
        >
          Clear Cart
        </button>
        
        <p className="text-xs text-gray-400 text-center mt-3">
          Pickup at Campus Café • 24hr processing time
        </p>
      </div>
    </div>
  )
}

export default CartSummary