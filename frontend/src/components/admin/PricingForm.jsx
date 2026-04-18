import React, { useState } from 'react'
import toast from 'react-hot-toast'

function PricingForm({ currentPricing, onSave }) {
  const [pricing, setPricing] = useState({
    blackAndWhite: currentPricing?.blackAndWhite || 5,
    color: currentPricing?.color || 20,
    bulkThreshold: currentPricing?.bulkThreshold || 50,
    bulkDiscount: currentPricing?.bulkDiscount || 15,
    studentDiscount: currentPricing?.studentDiscount || 5
  })
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setPricing(prev => ({ ...prev, [name]: parseInt(value) || 0 }))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(pricing)
    toast.success('Pricing settings saved!')
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Black & White Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Black & White Price (per page)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-500">₦</span>
            <input
              type="number"
              name="blackAndWhite"
              value={pricing.blackAndWhite}
              onChange={handleChange}
              min="1"
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Current: ₦{currentPricing?.blackAndWhite || 5}/page</p>
        </div>
        
        {/* Color Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Color Price (per page)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-500">₦</span>
            <input
              type="number"
              name="color"
              value={pricing.color}
              onChange={handleChange}
              min="1"
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Current: ₦{currentPricing?.color || 20}/page</p>
        </div>
        
        {/* Bulk Order Threshold */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bulk Order Threshold (pages)
          </label>
          <input
            type="number"
            name="bulkThreshold"
            value={pricing.bulkThreshold}
            onChange={handleChange}
            min="1"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            Orders with {pricing.bulkThreshold}+ pages get bulk discount
          </p>
        </div>
        
        {/* Bulk Discount Percentage */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bulk Discount (%)
          </label>
          <div className="relative">
            <input
              type="number"
              name="bulkDiscount"
              value={pricing.bulkDiscount}
              onChange={handleChange}
              min="0"
              max="100"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute right-3 top-2 text-gray-500">%</span>
          </div>
        </div>
        
        {/* Student Discount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Student Discount (%)
          </label>
          <div className="relative">
            <input
              type="number"
              name="studentDiscount"
              value={pricing.studentDiscount}
              onChange={handleChange}
              min="0"
              max="100"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute right-3 top-2 text-gray-500">%</span>
          </div>
        </div>
      </div>
      
      {/* Preview Section */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-2">Price Preview</h4>
        <div className="text-sm space-y-1">
          <p>• 10 pages B&W: ₦{pricing.blackAndWhite * 10}</p>
          <p>• 10 pages Color: ₦{pricing.color * 10}</p>
          <p>• {pricing.bulkThreshold} pages B&W (bulk): ₦{Math.round(pricing.blackAndWhite * pricing.bulkThreshold * (1 - pricing.bulkDiscount / 100))}</p>
        </div>
      </div>
      
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Save Pricing Settings
      </button>
    </form>
  )
}

export default PricingForm