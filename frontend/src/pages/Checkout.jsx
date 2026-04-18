import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import Loader from '../components/ui/Loader'
import useCartStore from '../store/cartStore'
import useUserStore from '../store/userStore'
import { formatCurrency, generateOrderId, isValidEmail, isValidPhone } from '../lib/utils'

function Checkout() {
  const navigate = useNavigate()
  const { items, totalAmount, clearCart } = useCartStore()
  const { setUser, addRecentOrder } = useUserStore()
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  })
  
  const [errors, setErrors] = useState({})
  const [isProcessing, setIsProcessing] = useState(false)
  
  // Redirect if cart is empty
  if (items.length === 0) {
    navigate('/cart')
    return null
  }
  
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }
  
  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!isValidPhone(formData.phone)) {
      newErrors.phone = 'Enter a valid 11-digit phone number'
    }
    
    if (formData.email && !isValidEmail(formData.email)) {
      newErrors.email = 'Enter a valid email address'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handlePayment = async () => {
    if (!validateForm()) {
      toast.error('Please fill in all required fields')
      return
    }
    
    setIsProcessing(true)
    
    // Mock payment processing
    setTimeout(() => {
      // Generate order
      const orderId = generateOrderId()
      const orderData = {
        id: orderId,
        date: new Date().toISOString(),
        items: items,
        total: totalAmount,
        customerInfo: formData,
        status: 'pending'
      }
      
      // Save user info
      setUser({
        name: formData.name,
        phone: formData.phone,
        email: formData.email
      })
      
      // Add to recent orders
      addRecentOrder(orderData)
      
      // Clear cart
      clearCart()
      
      // Show success and redirect
      toast.success('Payment successful!')
      setIsProcessing(false)
      
      // Navigate to success page with order details
      navigate('/success', { state: { orderId, orderData } })
    }, 2000)
  }
  
  const handleMockPaystack = () => {
    // This simulates Paystack payment popup
    if (!validateForm()) {
      toast.error('Please fill in all required fields')
      return
    }
    
    // Mock Paystack modal
    const confirmPayment = window.confirm(
      `Pay ${formatCurrency(totalAmount)} via Paystack (Demo)\n\n` +
      `This is a demo payment. No actual charge will be made.\n\n` +
      `Click OK to complete demo payment.`
    )
    
    if (confirmPayment) {
      handlePayment()
    }
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Form */}
            <div>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Your Information
                </h2>
                
                <Input
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  required
                  error={errors.name}
                />
                
                <Input
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="08012345678"
                  required
                  error={errors.phone}
                />
                
                <Input
                  label="Email (Optional)"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  error={errors.email}
                />
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-2">Pickup Instructions</h3>
                  <p className="text-sm text-gray-600">
                    Your documents will be ready for pickup at the Campus Café within 24 hours.
                    Please bring your order ID and a valid ID for verification.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Right Column - Order Summary */}
            <div>
              <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Order Summary
                </h2>
                
                {/* Items List */}
                <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <div>
                        <span className="text-gray-700">{item.fileName.split('.')[0]}</span>
                        <span className="text-gray-400 text-xs block">
                          {item.copies} copy × {item.pages} pages
                        </span>
                      </div>
                      <span className="font-medium">{formatCurrency(item.totalPrice)}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>{formatCurrency(totalAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Fee</span>
                    <span>{formatCurrency(0)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span className="text-blue-600">{formatCurrency(totalAmount)}</span>
                  </div>
                </div>
                
                {/* Payment Button */}
                <div className="mt-6">
                  <Button
                    onClick={handleMockPaystack}
                    disabled={isProcessing}
                    fullWidth
                    size="lg"
                    variant="primary"
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center gap-2">
                        <Loader size="sm" />
                        <span>Processing...</span>
                      </div>
                    ) : (
                      `Pay ${formatCurrency(totalAmount)} with Paystack`
                    )}
                  </Button>
                  
                  <p className="text-xs text-gray-400 text-center mt-3">
                    Secure payment powered by Paystack
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Processing Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 text-center">
            <Loader size="lg" />
            <p className="mt-4 text-gray-700">Processing your payment...</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Checkout