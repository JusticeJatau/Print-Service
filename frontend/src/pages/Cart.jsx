import React from 'react'
import { Link } from 'react-router-dom'
import CartItem from '../components/cart/CartItem'
import CartSummary from '../components/cart/CartSummary'
import useCartStore from '../store/cartStore'
import { formatCurrency } from '../lib/utils'

function Cart() {
  const { items, totalAmount, removeItem, updateItemQuantity, clearCart } = useCartStore()
  
  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 100) {
      updateItemQuantity(itemId, newQuantity)
    }
  }
  
  const handleRemoveItem = (itemId) => {
    if (window.confirm('Remove this item from cart?')) {
      removeItem(itemId)
    }
  }
  
  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your entire cart?')) {
      clearCart()
    }
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Cart</h1>
          <p className="text-gray-600">Review your print jobs before checkout</p>
        </div>
        
        {items.length === 0 ? (
          /* Empty Cart */
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <svg 
              className="w-24 h-24 text-gray-300 mx-auto mb-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M17 13l1.5 6M9 21h6M12 21v-6" 
              />
            </svg>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-6">
              Looks like you haven't added any print jobs yet
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/print"
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Start Printing
              </Link>
              <Link
                to="/handouts"
                className="inline-block border-2 border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors"
              >
                Browse Handouts
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items - Left Column */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Print Jobs ({items.length} {items.length === 1 ? 'item' : 'items'})
                  </h2>
                  <button
                    onClick={handleClearCart}
                    className="text-red-600 text-sm hover:text-red-700 transition-colors"
                  >
                    Clear All
                  </button>
                </div>
                
                <div className="space-y-3">
                  {items.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemove={handleRemoveItem}
                    />
                  ))}
                </div>
                
                {/* Continue Shopping Link */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <Link
                    to="/print"
                    className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Cart Summary - Right Column */}
            <div>
              <CartSummary
                items={items}
                totalAmount={totalAmount}
                onClearCart={handleClearCart}
              />
            </div>
          </div>
        )}
        
        {/* Recommended Section (when cart has items) */}
        {items.length > 0 && (
          <div className="mt-12">
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Pickup Information</h3>
                  <p className="text-sm text-gray-700">
                    All orders can be picked up from the Campus Café (Main Building). 
                    Please bring your order ID and student ID for verification.
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    ⏱ Estimated processing time: 24 hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart