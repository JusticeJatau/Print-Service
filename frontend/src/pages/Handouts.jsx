import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { mockHandouts } from '../mock/handouts'
import { formatCurrency } from '../lib/utils'
import useCartStore from '../store/cartStore'

function Handouts() {
  const [handouts, setHandouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCourse, setSelectedCourse] = useState('')
  const addItem = useCartStore((state) => state.addItem)
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setHandouts(mockHandouts)
      setLoading(false)
    }, 500)
  }, [])
  
  // Get unique courses for filter
  const courses = [...new Set(handouts.map(h => h.course))]
  
  // Filter handouts
  const filteredHandouts = handouts.filter(handout => {
    const matchesSearch = handout.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          handout.course.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCourse = !selectedCourse || handout.course === selectedCourse
    return matchesSearch && matchesCourse
  })
  
  const handleAddToCart = (handout) => {
    const cartItem = {
      id: Date.now(),
      fileName: handout.title,
      pages: handout.pageCount,
      copies: 1,
      printType: 'blackAndWhite', // Handouts are usually B&W
      isDoubleSided: true, // Handouts typically double-sided
      totalPrice: handout.price,
      pricePerCopy: handout.price,
      isHandout: true,
      handoutId: handout.id
    }
    
    addItem(cartItem)
    toast.success(`${handout.title} added to cart!`)
  }
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading handouts...</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Academic Handouts</h1>
          <p className="text-gray-600">
            Pre-uploaded course materials, lecture notes, and study guides
          </p>
        </div>
        
        {/* Search and Filter */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <input
                type="text"
                placeholder="Search by title or course..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            {/* Course Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course
              </label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Courses</option>
                {courses.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Results Count */}
        <div className="mb-4 text-sm text-gray-600">
          Found {filteredHandouts.length} {filteredHandouts.length === 1 ? 'handout' : 'handouts'}
        </div>
        
        {/* Handouts Grid */}
        {filteredHandouts.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No handouts found</h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHandouts.map((handout) => (
              <div key={handout.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                {/* Handout Cover */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium bg-white bg-opacity-20 px-2 py-1 rounded">
                      {handout.course}
                    </span>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg mb-1">{handout.title}</h3>
                  <p className="text-sm text-blue-100">{handout.pageCount} pages</p>
                </div>
                
                {/* Handout Body */}
                <div className="p-4">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {handout.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-blue-600">
                        {formatCurrency(handout.price)}
                      </span>
                      <span className="text-xs text-gray-500"> total</span>
                    </div>
                    
                    <button
                      onClick={() => handleAddToCart(handout)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M17 13l1.5 6M9 21h6M12 21v-6" />
                      </svg>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Info Note */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm text-yellow-800">
                <span className="font-semibold">Note:</span> Handouts are printed in black & white, double-sided 
                to save costs. You can add them to your cart along with other print jobs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Handouts