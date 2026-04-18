import React, { useState, useEffect } from 'react'
import AdminSidebar from '../../components/admin/AdminSidebar'
import PricingForm from '../../components/admin/PricingForm'
import { getCurrentPricing, updatePricingSettings } from '../../lib/pricing'
import toast from 'react-hot-toast'

function AdminPricing() {
  const [currentPricing, setCurrentPricing] = useState(null)
  
  useEffect(() => {
    // Load current pricing
    const pricing = getCurrentPricing()
    setCurrentPricing(pricing)
  }, [])
  
  const handleSavePricing = (newPricing) => {
    // Save to localStorage for persistence
    localStorage.setItem('pricing_settings', JSON.stringify(newPricing))
    
    // Update the pricing in the lib (in a real app, this would be an API call)
    updatePricingSettings(newPricing)
    
    setCurrentPricing(newPricing)
    toast.success('Pricing settings updated successfully!')
  }
  
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">Pricing Settings</h1>
            <p className="text-gray-600">Manage printing costs and discounts</p>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="p-6">
          <div className="max-w-4xl mx-auto">
            {/* Info Card */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm text-blue-800">
                    <span className="font-semibold">Note:</span> Changes to pricing will affect all new orders. 
                    Existing orders will keep their original pricing.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Pricing Form */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Edit Pricing</h2>
              {currentPricing && (
                <PricingForm 
                  currentPricing={currentPricing}
                  onSave={handleSavePricing}
                />
              )}
            </div>
            
            {/* Pricing Guide */}
            <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Pricing Guide</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Black & White Printing:</span>
                  <span className="font-medium">Recommended: ₦3 - ₦10 per page</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Color Printing:</span>
                  <span className="font-medium">Recommended: ₦15 - ₦30 per page</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Bulk Discount Threshold:</span>
                  <span className="font-medium">Recommended: 50+ pages</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Bulk Discount:</span>
                  <span className="font-medium">Recommended: 10% - 20%</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Student Discount:</span>
                  <span className="font-medium">Recommended: 5% - 10%</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminPricing