import axios from 'axios'

// Base URL for API - change this when you have a backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  }
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
      window.location.href = '/admin'
    }
    return Promise.reject(error)
  }
)

// Order Services
export const orderService = {
  // Get all orders
  getAllOrders: () => api.get('/orders'),
  
  // Get single order
  getOrder: (id) => api.get(`/orders/${id}`),
  
  // Create new order
  createOrder: (orderData) => api.post('/orders', orderData),
  
  // Update order status
  updateOrderStatus: (id, status) => api.patch(`/orders/${id}/status`, { status }),
  
  // Get user orders
  getUserOrders: () => api.get('/orders/my-orders')
}

// Pricing Services
export const pricingService = {
  // Get current pricing
  getPricing: () => api.get('/pricing'),
  
  // Update pricing (admin only)
  updatePricing: (pricingData) => api.put('/pricing', pricingData),
  
  // Calculate price
  calculatePrice: (printData) => api.post('/pricing/calculate', printData)
}

// Handout Services
export const handoutService = {
  // Get all handouts
  getAllHandouts: () => api.get('/handouts'),
  
  // Get single handout
  getHandout: (id) => api.get(`/handouts/${id}`),
  
  // Upload handout (admin only)
  uploadHandout: (formData) => api.post('/handouts', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  
  // Delete handout (admin only)
  deleteHandout: (id) => api.delete(`/handouts/${id}`)
}

// Upload Services
export const uploadService = {
  // Upload file for printing
  uploadFile: (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        return percentCompleted
      }
    })
  },
  
  // Get file info (pages, etc.)
  getFileInfo: (fileId) => api.get(`/upload/${fileId}`)
}

// Dashboard Services (Admin)
export const dashboardService = {
  // Get dashboard stats
  getStats: () => api.get('/admin/stats'),
  
  // Get recent activity
  getRecentActivity: () => api.get('/admin/recent-activity'),
  
  // Get revenue data
  getRevenue: (period = 'month') => api.get(`/admin/revenue?period=${period}`)
}

export default api