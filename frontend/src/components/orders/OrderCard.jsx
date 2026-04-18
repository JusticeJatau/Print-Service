import React, { useState } from 'react'
import OrderStatusBadge from './OrderStatusBadge'
import Modal from '../ui/Modal'
import { formatCurrency, formatDate } from '../../lib/utils'

function OrderCard({ order }) {
  const [showDetails, setShowDetails] = useState(false)
  
  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Order Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono font-bold text-gray-900">{order.id}</span>
              <OrderStatusBadge status={order.status} />
            </div>
            
            <div className="text-sm text-gray-500 space-x-3">
              <span>{formatDate(order.date)}</span>
              <span>•</span>
              <span>{order.items.length} item(s)</span>
            </div>
          </div>
          
          {/* Total and Action */}
          <div className="flex items-center justify-between md:justify-end gap-4">
            <div className="text-right">
              <div className="text-sm text-gray-600">Total</div>
              <div className="font-bold text-blue-600">{formatCurrency(order.total)}</div>
            </div>
            
            <button
              onClick={() => setShowDetails(true)}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
      
      {/* Order Details Modal */}
      <Modal
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        title={`Order ${order.id}`}
        size="lg"
      >
        <div className="space-y-4">
          {/* Status and Date */}
          <div className="flex justify-between items-center">
            <OrderStatusBadge status={order.status} />
            <span className="text-sm text-gray-500">{formatDate(order.date)}</span>
          </div>
          
          {/* Items List */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Items</h4>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="border-b border-gray-100 pb-3">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium text-gray-900">{item.fileName}</span>
                    <span className="font-medium">{formatCurrency(item.price)}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {item.pages} pages • {item.copies} copy • {item.printType === 'color' ? 'Color' : 'B&W'}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Total */}
          <div className="border-t border-gray-200 pt-3 flex justify-between">
            <span className="font-semibold text-gray-900">Total</span>
            <span className="font-bold text-blue-600 text-lg">{formatCurrency(order.total)}</span>
          </div>
          
          {/* Pickup Info */}
          <div className="bg-gray-50 rounded-lg p-3 mt-2">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Pickup Location:</span> {order.pickupLocation}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              <span className="font-medium">Instructions:</span> Bring your order ID for verification
            </p>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default OrderCard