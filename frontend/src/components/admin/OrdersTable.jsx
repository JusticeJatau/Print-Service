import React, { useState } from 'react'
import Modal from '../ui/Modal'
import { formatCurrency, formatDate } from '../../lib/utils'

function OrdersTable({ orders, onUpdateStatus }) {
  const [selectedOrder, setSelectedOrder] = useState(null)
  
  const statusOptions = ['pending', 'printing', 'ready']
  
  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      printing: 'bg-blue-100 text-blue-800',
      ready: 'bg-green-100 text-green-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }
  
  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Items
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-mono text-sm font-medium text-gray-900">
                  {order.id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {formatDate(order.date)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {order.customerInfo?.name || 'Guest User'}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {order.items.length} items
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {formatCurrency(order.total)}
                </td>
                <td className="px-6 py-4">
                  <select
                    value={order.status}
                    onChange={(e) => onUpdateStatus(order.id, e.target.value)}
                    className={`px-2 py-1 text-xs rounded-full border-0 focus:ring-2 ${getStatusColor(order.status)}`}
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4 text-sm">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Order Details Modal */}
      <Modal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title={`Order ${selectedOrder?.id}`}
        size="lg"
      >
        {selectedOrder && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Customer Name</p>
                <p className="font-medium">{selectedOrder.customerInfo?.name || 'Guest'}</p>
              </div>
              <div>
                <p className="text-gray-500">Phone</p>
                <p className="font-medium">{selectedOrder.customerInfo?.phone || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-500">Email</p>
                <p className="font-medium">{selectedOrder.customerInfo?.email || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-500">Date</p>
                <p className="font-medium">{formatDate(selectedOrder.date)}</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Items</h4>
              <div className="space-y-2">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="border-b pb-2">
                    <p className="font-medium">{item.fileName}</p>
                    <p className="text-sm text-gray-500">
                      {item.pages} pages • {item.copies} copies • 
                      {item.printType === 'color' ? ' Color' : ' B&W'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border-t pt-3">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span className="text-blue-600">{formatCurrency(selectedOrder.total)}</span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}

export default OrdersTable