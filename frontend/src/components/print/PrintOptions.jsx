import React from 'react'

function PrintOptions({ 
  printType, 
  setPrintType,
  isDoubleSided,
  setIsDoubleSided,
  copies,
  setCopies,
  pages,
  pricePerPage
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Print Options</h3>
      
      <div className="space-y-6">
        {/* Print Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Print Type
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setPrintType('blackAndWhite')}
              className={`
                px-4 py-3 rounded-lg border-2 text-center transition-all
                ${printType === 'blackAndWhite'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300 text-gray-600'
                }
              `}
            >
              <div className="font-medium">Black & White</div>
              <div className="text-sm mt-1">₦{pricePerPage?.blackAndWhite || 5}/page</div>
            </button>
            
            <button
              onClick={() => setPrintType('color')}
              className={`
                px-4 py-3 rounded-lg border-2 text-center transition-all
                ${printType === 'color'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300 text-gray-600'
                }
              `}
            >
              <div className="font-medium">Color</div>
              <div className="text-sm mt-1">₦{pricePerPage?.color || 20}/page</div>
            </button>
          </div>
        </div>
        
        {/* Double-sided Option */}
        <div>
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <span className="text-sm font-medium text-gray-700">Double-sided printing</span>
              <p className="text-xs text-gray-500 mt-1">Save 10% on total cost</p>
            </div>
            <div className="relative">
              <input
                type="checkbox"
                checked={isDoubleSided}
                onChange={(e) => setIsDoubleSided(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </div>
          </label>
        </div>
        
        {/* Number of Copies */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Copies
          </label>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setCopies(Math.max(1, copies - 1))}
              className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            
            <input
              type="number"
              min="1"
              max="100"
              value={copies}
              onChange={(e) => setCopies(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-20 text-center px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            <button
              onClick={() => setCopies(Math.min(100, copies + 1))}
              className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Summary Info */}
        <div className="bg-gray-50 rounded-lg p-3 text-sm">
          <div className="flex justify-between mb-1">
            <span className="text-gray-600">Pages per copy:</span>
            <span className="font-medium">{pages}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span className="text-gray-600">Total pages:</span>
            <span className="font-medium">{pages * copies}</span>
          </div>
          {isDoubleSided && (
            <div className="flex justify-between text-green-600">
              <span>Double-sided discount:</span>
              <span>-10%</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PrintOptions