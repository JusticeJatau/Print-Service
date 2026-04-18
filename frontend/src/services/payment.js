// Payment service for Paystack integration
import toast from 'react-hot-toast'

// Paystack public key - replace with your actual key
const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_demo'

export const paymentService = {
  // Initialize payment with Paystack
  initializePayment: async (orderData, onSuccess, onClose) => {
    // Check if Paystack is loaded
    if (!window.PaystackPop) {
      toast.error('Payment system not loaded. Please refresh the page.')
      return
    }

    const handler = window.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: orderData.email,
      amount: orderData.amount * 100, // Paystack expects amount in kobo
      currency: 'NGN',
      ref: orderData.reference || `ORDER_${Date.now()}`,
      metadata: {
        custom_fields: [
          {
            display_name: "Order ID",
            variable_name: "order_id",
            value: orderData.orderId
          },
          {
            display_name: "Customer Name",
            variable_name: "customer_name",
            value: orderData.name
          }
        ]
      },
      callback: (response) => {
        // Payment successful
        toast.success('Payment successful!')
        if (onSuccess) {
          onSuccess({
            reference: response.reference,
            transactionId: response.transaction,
            orderId: orderData.orderId
          })
        }
      },
      onClose: () => {
        // Payment window closed
        toast.error('Payment cancelled')
        if (onClose) {
          onClose()
        }
      }
    })

    handler.openIframe()
  },

  // Mock payment for development (no actual Paystack)
  mockPayment: async (orderData) => {
    return new Promise((resolve, reject) => {
      // Simulate payment processing
      toast.loading('Processing payment...', { id: 'payment' })
      
      setTimeout(() => {
        // Random success/failure for demo (90% success rate)
        const isSuccess = Math.random() < 0.9
        
        toast.dismiss('payment')
        
        if (isSuccess) {
          toast.success('Payment successful!')
          resolve({
            success: true,
            reference: `MOCK_REF_${Date.now()}`,
            transactionId: `TXN_${Date.now()}`,
            orderId: orderData.orderId,
            amount: orderData.amount
          })
        } else {
          toast.error('Payment failed. Please try again.')
          reject(new Error('Payment failed'))
        }
      }, 2000)
    })
  },

  // Verify payment (for backend verification)
  verifyPayment: async (reference) => {
    // In a real app, this would call your backend to verify the payment
    // For now, we'll just return a mock response
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: 'success',
          reference: reference,
          amount: 0,
          paid_at: new Date().toISOString()
        })
      }, 1000)
    })
  },

  // Format amount for display
  formatAmount: (amount) => {
    return `₦${amount.toLocaleString()}`
  }
}

// Load Paystack script dynamically
export const loadPaystackScript = () => {
  return new Promise((resolve, reject) => {
    if (document.querySelector('script[src*="paystack"]')) {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.src = 'https://js.paystack.co/v1/inline.js'
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load Paystack'))
    document.head.appendChild(script)
  })
}

export default paymentService