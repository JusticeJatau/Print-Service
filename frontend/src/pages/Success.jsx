import React from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { formatCurrency, formatDate } from '../lib/utils'

function Success() {
  const location = useLocation()
  const navigate = useNavigate()
  const { orderId, orderData } = location.state || {}
  
  // If no order data, redirect to home
  if (!orderData) {
    navigate('/')
    return null
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto">
          {/* Success Card */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Green Header */}
            <div className="bg-green-600 text-white text-center py-8">
              <div className="flex justify-center mb-4">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
              <p className="text-green-100">Your order has been confirmed</p>
            </div>
            
            {/* Order Info */}
            <div className="p-6">
              <div className="text-center mb-6">
                <p className="text-gray-600">Order ID</p>
                <p className="text-2xl font-mono font-bold text-gray-900">{orderId}</p>
              </div>
              
              {/* Order Details */}
              <div className="border-t border-gray-200 pt-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Order Details</h3>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span>{formatDate(orderData.date)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span>{orderData.customerInfo.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span>{orderData.customerInfo.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Paid:</span>
                    <span className="font-bold text-green-600">{formatCurrency(orderData.total)}</span>
                  </div>
                </div>
              </div>
              
              {/* Items Summary */}
              <div className="border-t border-gray-200 pt-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Items</h3>
                <div className="space-y-2">
                  {orderData.items.map((item, index) => (
                    <div key={index} className="text-sm flex justify-between">
                      <span className="text-gray-600">
                        {item.fileName} ({item.copies} copy × {item.pages} pages)
                      </span>
                      <span>{formatCurrency(item.totalPrice)}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Pickup Instructions */}
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">Pickup Information</h4>
                    <p className="text-sm text-blue-800">
                      Your documents will be ready in 24 hours. Pick them up from:
                    </p>
                    <p className="text-sm font-medium text-blue-900 mt-1">
                      📍 Campus Café, Main Building
                    </p>
                    <p className="text-xs text-blue-700 mt-2">
                      Please bring your Order ID ({orderId}) and Student/Staff ID for verification
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/orders"
                  className="flex-1 text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Track Your Order
                </Link>
                <Link
                  to="/print"
                  className="flex-1 text-center border-2 border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors"
                >
                  Print Another Document
                </Link>
              </div>
            </div>
          </div>
          
          {/* Back to Home Link */}
          <div className="text-center mt-6">
            <Link to="/" className="text-gray-500 hover:text-gray-700 text-sm">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Success