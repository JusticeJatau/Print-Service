import React, { useState, useEffect } from 'react'
import AdminSidebar from '../../components/admin/AdminSidebar'
import HandoutUploader from '../../components/admin/HandoutUploader'
import { formatCurrency, formatDate } from '../../lib/utils'
import toast from 'react-hot-toast'

function AdminHandouts() {
  const [handouts, setHandouts] = useState([])
  const [showUploader, setShowUploader] = useState(false)
  
  useEffect(() => {
    // Load handouts from localStorage
    const storedHandouts = localStorage.getItem('admin_handouts')
    if (storedHandouts) {
      setHandouts(JSON.parse(storedHandouts))
    } else {
      // Load default handouts
      const defaultHandouts = [
        {
          id: "H001",
          title: "Introduction to Computer Science",
          course: "CS 101",
          pageCount: 45,
          price: 225,
          description: "Complete lecture notes for CS 101 - Programming Fundamentals",
          dateAdded: new Date().toISOString()
        },
        {
          id: "H002",
          title: "Advanced Mathematics",
          course: "MATH 201",
          pageCount: 78,
          price: 390,
          description: "Calculus and Linear Algebra notes",
          dateAdded: new Date().toISOString()
        }
      ]
      setHandouts(defaultHandouts)
      localStorage.setItem('admin_handouts', JSON.stringify(defaultHandouts))
    }
  }, [])
  
  const handleUpload = (newHandout) => {
    const updatedHandouts = [newHandout, ...handouts]
    setHandouts(updatedHandouts)
    localStorage.setItem('admin_handouts', JSON.stringify(updatedHandouts))
    setShowUploader(false)
    toast.success('Handout uploaded successfully!')
  }
  
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this handout?')) {
      const updatedHandouts = handouts.filter(h => h.id !== id)
      setHandouts(updatedHandouts)
      localStorage.setItem('admin_handouts', JSON.stringify(updatedHandouts))
      toast.success('Handout deleted')
    }
  }
  
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Handouts Management</h1>
              <p className="text-gray-600">Upload and manage academic handouts for sale</p>
            </div>
            <button
              onClick={() => setShowUploader(!showUploader)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Upload New Handout
            </button>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="p-6">
          {/* Upload Form */}
          {showUploader && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Upload Handout</h2>
                <button
                  onClick={() => setShowUploader(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <HandoutUploader onUpload={handleUpload} />
            </div>
          )}
          
          {/* Handouts List */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Available Handouts ({handouts.length})
              </h2>
            </div>
            
            {handouts.length === 0 ? (
              <div className="p-12 text-center">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <p className="text-gray-500">No handouts uploaded yet</p>
                <button
                  onClick={() => setShowUploader(true)}
                  className="mt-4 text-blue-600 hover:text-blue-700"
                >
                  Upload your first handout
                </button>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {handouts.map((handout) => (
                  <div key={handout.id} className="p-6 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900">{handout.title}</h3>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {handout.course}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{handout.description}</p>
                        <div className="flex gap-4 text-sm text-gray-500">
                          <span>{handout.pageCount} pages</span>
                          <span>{formatCurrency(handout.price)}</span>
                          <span>Added: {formatDate(handout.dateAdded || new Date())}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete(handout.id)}
                        className="text-red-600 hover:text-red-700 ml-4"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminHandouts