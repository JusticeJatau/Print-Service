import { useState, useEffect, useCallback } from 'react'
import { calculatePrintPrice, getPriceBreakdown, getCurrentPricing } from '../lib/pricing'

function usePricing() {
  const [pricing, setPricing] = useState({
    pages: 0,
    copies: 1,
    printType: 'blackAndWhite',
    isDoubleSided: false
  })
  
  const [priceBreakdown, setPriceBreakdown] = useState({
    subtotal: 0,
    discounts: [],
    total: 0,
    pricePerPage: 0,
    totalPages: 0
  })
  
  const [currentRates, setCurrentRates] = useState(null)

  useEffect(() => {
    // Load current pricing rates
    const rates = getCurrentPricing()
    setCurrentRates(rates)
  }, [])

  useEffect(() => {
    if (pricing.pages > 0) {
      const breakdown = getPriceBreakdown(
        pricing.pages,
        pricing.copies,
        pricing.printType,
        pricing.isDoubleSided
      )
      setPriceBreakdown(breakdown)
    }
  }, [pricing])

  const updatePages = useCallback((pages) => {
    setPricing(prev => ({ ...prev, pages }))
  }, [])

  const updateCopies = useCallback((copies) => {
    setPricing(prev => ({ ...prev, copies: Math.max(1, Math.min(100, copies)) }))
  }, [])

  const updatePrintType = useCallback((printType) => {
    setPricing(prev => ({ ...prev, printType }))
  }, [])

  const updateDoubleSided = useCallback((isDoubleSided) => {
    setPricing(prev => ({ ...prev, isDoubleSided }))
  }, [])

  const getTotalPrice = useCallback(() => {
    return calculatePrintPrice(
      pricing.pages,
      pricing.copies,
      pricing.printType,
      pricing.isDoubleSided
    )
  }, [pricing])

  const resetPricing = useCallback(() => {
    setPricing({
      pages: 0,
      copies: 1,
      printType: 'blackAndWhite',
      isDoubleSided: false
    })
  }, [])

  return {
    pricing,
    priceBreakdown,
    currentRates,
    updatePages,
    updateCopies,
    updatePrintType,
    updateDoubleSided,
    getTotalPrice,
    resetPricing,
    hasValidPages: pricing.pages > 0
  }
}

export default usePricing