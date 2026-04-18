import React, { useState, useEffect } from 'react'
import AdminSidebar from '../../components/admin/AdminSidebar'
import { mockOrders } from '../../mock/orders'

function Dashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    printingOrders: 0,
    readyOrders: 0,
    totalRevenue: 0
  })
  
  useEffect(() => {
    // Calculate stats from mock orders
    const total = mockOrders.length
    const pending = mockOrders.filter(o => o.status === 'pending').length
    const printing = mockOrders.filter(o => o.status === 'printing').length
    const ready = mockOrders.filter(o => o.status === 'ready').length
    const revenue = mockOrders.reduce((sum, o) => sum + o.total, 0)
    
    setStats({
      totalOrders: total,
      pendingOrders: pending,
      printingOrders: printing,
      readyOrders: ready,
      totalRevenue: revenue
    })
  }, [])
  
  const statCards = [
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      color: 'bg-blue-500'
    },
    {
      title: 'Pending',
      value: stats.pendingOrders,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'bg-yellow-500'
    },
    {
      title: 'Printing',
      value: stats.printingOrders,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
        </svg>
      ),
      color: 'bg-blue-500'
    },
    {
      title: 'Ready',
      value: stats.readyOrders,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'bg-green-500'
    }
  ]
  
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back, Admin</p>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-full text-white`}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Revenue Card */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue Overview</h2>
            <div className="flex items-baseline">
              <span className="text-4xl font-bold text-blue-600">₦{stats.totalRevenue.toLocaleString()}</span>
              <span className="text-gray-500 ml-2">total revenue</span>
            </div>
            <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 rounded-full"
                style={{ width: `${(stats.readyOrders / stats.totalOrders) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {Math.round((stats.readyOrders / stats.totalOrders) * 100)}% of orders completed
            </p>
          </div>
          
          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h2>
            <div className="space-y-3">
              {mockOrders.slice(0, 5).map((order) => (
                <div key={order.id} className="flex justify-between items-center py-2 border-b">
                  <div>
                    <p className="font-mono text-sm font-medium">{order.id}</p>
                    <p className="text-xs text-gray-500">{order.items.length} items</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₦{order.total}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'printing' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard