import React, { useState, useEffect } from 'react'
import AdminSidebar from '../../components/admin/AdminSidebar'
import OrdersTable from '../../components/admin/OrdersTable'
import { mockOrders } from '../../mock/orders'
import toast from 'react-hot-toast'

function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  
  useEffect(() => {
    // Load orders (combine mock orders with any from localStorage)
    const storedOrders = localStorage.getItem('admin_orders')
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders))
    } else {
      setOrders(mockOrders)
      localStorage.setItem('admin_orders', JSON.stringify(mockOrders))
    }
  }, [])
  
  const handleUpdateStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    )
    setOrders(updatedOrders)
    localStorage.setItem('admin_orders', JSON.stringify(updatedOrders))
    toast.success(`Order ${orderId} status updated to ${newStatus}`)
  }
  
  const filteredOrders = orders.filter(order => {
    const matchesFilter = filter === 'all' || order.status === filter
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (order.customerInfo?.name || '').toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })
  
  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    printing: orders.filter(o => o.status === 'printing').length,
    ready: orders.filter(o => o.status === 'ready').length
  }
  
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
            <p className="text-gray-600">View and manage all print orders</p>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="p-6">
          {/* Stats Bar */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-sm text-gray-500">Total Orders</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              <p className="text-sm text-gray-500">Pending</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">{stats.printing}</p>
              <p className="text-sm text-gray-500">Printing</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-green-600">{stats.ready}</p>
              <p className="text-sm text-gray-500">Ready</p>
            </div>
          </div>
          
          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search by Order ID or Customer Name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              {/* Status Filter */}
              <div className="flex gap-2">
                {['all', 'pending', 'printing', 'ready'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`
                      px-4 py-2 rounded-lg text-sm font-medium transition-colors
                      ${filter === status 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }
                    `}
                  >
                    {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Orders Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {filteredOrders.length === 0 ? (
              <div className="p-12 text-center">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p className="text-gray-500">No orders found</p>
              </div>
            ) : (
              <OrdersTable 
                orders={filteredOrders} 
                onUpdateStatus={handleUpdateStatus}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminOrders