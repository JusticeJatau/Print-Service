import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import OrderCard from '../components/orders/OrderCard'
import Loader from '../components/ui/Loader'
import useUserStore from '../store/userStore'
import { mockOrders } from '../mock/orders'

function Orders() {
  const { recentOrders, user } = useUserStore()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  
  useEffect(() => {
    // Simulate API call to fetch orders
    setTimeout(() => {
      // Combine mock orders with user's recent orders
      const allOrders = [...mockOrders, ...recentOrders]
      // Sort by date (newest first)
      const sortedOrders = allOrders.sort((a, b) => new Date(b.date) - new Date(a.date))
      setOrders(sortedOrders)
      setLoading(false)
    }, 1000)
  }, [recentOrders])
  
  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true
    return order.status === filter
  })
  
  const getStatusCount = (status) => {
    if (status === 'all') return orders.length
    return orders.filter(order => order.status === status).length
  }
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader size="lg" />
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">Track and manage your print orders</p>
        </div>
        
        {/* Filter Tabs */}
        <div className="mb-6">
          <div className="flex gap-2 border-b border-gray-200">
            {['all', 'pending', 'printing', 'ready'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`
                  px-4 py-2 text-sm font-medium transition-colors relative
                  ${filter === status 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                  }
                `}
              >
                {status === 'all' ? 'All Orders' : status.charAt(0).toUpperCase() + status.slice(1)}
                <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                  {getStatusCount(status)}
                </span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <svg 
              className="w-20 h-20 text-gray-300 mx-auto mb-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-500 mb-4">
              {filter !== 'all' 
                ? `You don't have any ${filter} orders` 
                : "You haven't placed any orders yet"}
            </p>
            <Link
              to="/print"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Place Your First Order
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
        
        {/* Quick Tips */}
        {orders.length > 0 && (
          <div className="mt-8 bg-blue-50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-sm text-blue-800">
                  <span className="font-semibold">Order Status Guide:</span>
                  <br />
                  • <strong>Pending</strong> - We've received your order and are reviewing it
                  <br />
                  • <strong>Printing</strong> - Your documents are being printed
                  <br />
                  • <strong>Ready for Pickup</strong> - Come to the Campus Café to collect your order
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders