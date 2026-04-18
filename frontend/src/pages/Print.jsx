import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import FileUpload from '../components/print/FileUpload'
import FilePreview from '../components/print/FilePreview'
import PrintOptions from '../components/print/PrintOptions'
import SummaryCard from '../components/print/SummaryCard'
import { calculatePages } from '../lib/utils'
import { calculatePrintPrice } from '../lib/pricing'
import useCartStore from '../store/cartStore'

function Print() {
  const navigate = useNavigate()
  const addItem = useCartStore((state) => state.addItem)
  
  const [file, setFile] = useState(null)
  const [pages, setPages] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [printType, setPrintType] = useState('blackAndWhite')
  const [isDoubleSided, setIsDoubleSided] = useState(false)
  const [copies, setCopies] = useState(1)
  
  const pricePerPage = {
    blackAndWhite: 5,
    color: 20
  }
  
  const handleFileUpload = async (uploadedFile) => {
    setIsUploading(true)
    setFile(uploadedFile)
    
    try {
      // Calculate pages from file
      const pageCount = await calculatePages(uploadedFile)
      setPages(pageCount)
      toast.success(`File uploaded! Found ${pageCount} pages`)
    } catch (error) {
      toast.error('Error processing file')
      console.error(error)
    } finally {
      setIsUploading(false)
    }
  }
  
  const handleClearFile = () => {
    setFile(null)
    setPages(0)
    setPrintType('blackAndWhite')
    setIsDoubleSided(false)
    setCopies(1)
  }
  
  const handleAddToCart = () => {
    if (!file) {
      toast.error('Please upload a file first')
      return
    }
    
    const totalPrice = calculatePrintPrice(pages, copies, printType, isDoubleSided)
    const pricePerCopy = totalPrice / copies
    
    const cartItem = {
      id: Date.now(),
      fileName: file.name,
      pages: pages,
      copies: copies,
      printType: printType,
      isDoubleSided: isDoubleSided,
      totalPrice: totalPrice,
      pricePerCopy: pricePerCopy,
      fileSize: file.size,
      fileType: file.type
    }
    
    addItem(cartItem)
    toast.success('Added to cart!')
    
    // Optional: Ask user if they want to continue or go to cart
    setTimeout(() => {
      if (window.confirm('Added to cart! Go to cart now?')) {
        navigate('/cart')
      }
    }, 500)
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Print Your Document</h1>
          <p className="text-gray-600">Upload your file, choose options, and see price instantly</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Input */}
          <div className="lg:col-span-2 space-y-6">
            {/* File Upload */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">1. Upload File</h2>
              <FileUpload 
                onFileUpload={handleFileUpload} 
                isUploading={isUploading}
              />
              
              {file && (
                <div className="mt-4">
                  <FilePreview 
                    file={file} 
                    pages={pages} 
                    onClear={handleClearFile}
                  />
                </div>
              )}
            </div>
            
            {/* Print Options */}
            {file && pages > 0 && (
              <PrintOptions
                printType={printType}
                setPrintType={setPrintType}
                isDoubleSided={isDoubleSided}
                setIsDoubleSided={setIsDoubleSided}
                copies={copies}
                setCopies={setCopies}
                pages={pages}
                pricePerPage={pricePerPage}
              />
            )}
          </div>
          
          {/* Right Column - Summary */}
          <div>
            {file && pages > 0 ? (
              <SummaryCard
                pages={pages}
                copies={copies}
                printType={printType}
                isDoubleSided={isDoubleSided}
                totalPrice={calculatePrintPrice(pages, copies, printType, isDoubleSided)}
                onAddToCart={handleAddToCart}
                isUploading={isUploading}
              />
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No file selected</h3>
                <p className="text-gray-500 text-sm">
                  Upload a PDF or Word document to see pricing
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Tips Section */}
        <div className="mt-12 bg-blue-50 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm text-blue-800">
                <span className="font-semibold">Tips:</span> Use double-sided printing to save 10%. 
                Bulk orders (50+ pages) get additional discount. Maximum file size: 50MB.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Print