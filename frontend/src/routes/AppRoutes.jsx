import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Pages
import Home from '../pages/Home'
import Print from '../pages/Print'
import Cart from '../pages/Cart'
import Checkout from '../pages/Checkout'
import Success from '../pages/Success'
import Orders from '../pages/Orders'
import Handouts from '../pages/Handouts'

// Admin Pages
import AdminDashboard from '../pages/admin/Dashboard'
import AdminOrders from '../pages/admin/Orders'
import AdminPricing from '../pages/admin/Pricing'
import AdminHandouts from '../pages/admin/Handouts'

// Protected Route Component
function ProtectedRoute({ children }) {
  const { isAuthenticated, isAdmin, loading } = useAuth()
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }
  
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/admin-login" replace />
  }
  
  return children
}

// Simple admin login page (add this if needed)
function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(email, password)
      navigate('/admin')
    } catch (error) {
      console.error('Login failed', error)
    }
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-3 px-3 py-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 px-3 py-2 border rounded"
            required
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
            Login
          </button>
        </form>
        <p className="text-xs text-gray-500 text-center mt-4">
          Demo: admin@campusprint.com / admin123
        </p>
      </div>
    </div>
  )
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes with Layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/print" element={<Print />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/handouts" element={<Handouts />} />
      </Route>
      
      {/* Admin Login */}
      <Route path="/admin-login" element={<AdminLogin />} />
      
      {/* Protected Admin Routes */}
      <Route path="/admin" element={
        <ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>
      } />
      <Route path="/admin/orders" element={
        <ProtectedRoute>
          <AdminOrders />
        </ProtectedRoute>
      } />
      <Route path="/admin/pricing" element={
        <ProtectedRoute>
          <AdminPricing />
        </ProtectedRoute>
      } />
      <Route path="/admin/handouts" element={
        <ProtectedRoute>
          <AdminHandouts />
        </ProtectedRoute>
      } />
    </Routes>
  )
}

export default AppRoutes