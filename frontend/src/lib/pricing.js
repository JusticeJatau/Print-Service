import { pricingSettings } from '../mock/pricing'

// Calculate price for a single print job
export const calculatePrintPrice = (pages, copies, printType, isDoubleSided = false) => {
  let pricePerPage = printType === 'color' 
    ? pricingSettings.color.perPage 
    : pricingSettings.blackAndWhite.perPage
  
  let totalPages = pages * copies
  
  // Apply double-sided discount if applicable
  if (isDoubleSided) {
    const discount = printType === 'color' 
      ? pricingSettings.color.doubleSidedDiscount 
      : pricingSettings.blackAndWhite.doubleSidedDiscount
    pricePerPage = pricePerPage * (1 - discount)
  }
  
  let totalPrice = totalPages * pricePerPage
  
  // Apply bulk order discount
  if (totalPages >= pricingSettings.discounts.bulkOrder.threshold) {
    totalPrice = totalPrice * (1 - pricingSettings.discounts.bulkOrder.discount)
  }
  
  return Math.round(totalPrice)
}

// Calculate total for multiple items
export const calculateCartTotal = (items) => {
  return items.reduce((total, item) => {
    return total + calculatePrintPrice(
      item.pages,
      item.copies,
      item.printType,
      item.isDoubleSided
    )
  }, 0)
}

// Get price breakdown
export const getPriceBreakdown = (pages, copies, printType, isDoubleSided = false) => {
  let pricePerPage = printType === 'color' 
    ? pricingSettings.color.perPage 
    : pricingSettings.blackAndWhite.perPage
  
  let totalPages = pages * copies
  let subtotal = totalPages * pricePerPage
  
  let discounts = []
  let finalPrice = subtotal
  
  // Double-sided discount
  if (isDoubleSided) {
    const discountAmount = subtotal * (printType === 'color' 
      ? pricingSettings.color.doubleSidedDiscount 
      : pricingSettings.blackAndWhite.doubleSidedDiscount)
    discounts.push({
      name: 'Double-sided printing',
      amount: Math.round(discountAmount)
    })
    finalPrice = subtotal - discountAmount
  }
  
  // Bulk order discount
  if (totalPages >= pricingSettings.discounts.bulkOrder.threshold) {
    const discountAmount = finalPrice * pricingSettings.discounts.bulkOrder.discount
    discounts.push({
      name: `Bulk order (${totalPages}+ pages)`,
      amount: Math.round(discountAmount)
    })
    finalPrice = finalPrice - discountAmount
  }
  
  return {
    subtotal: Math.round(subtotal),
    discounts,
    total: Math.round(finalPrice),
    pricePerPage,
    totalPages
  }
}

// Update pricing settings (admin only)
export const updatePricingSettings = (newSettings) => {
  // This would typically update the backend
  // For now, we'll just log it
  console.log('Pricing settings updated:', newSettings)
  // In a real app, you'd make an API call here
}

// Get current pricing for display
export const getCurrentPricing = () => {
  return {
    blackAndWhite: pricingSettings.blackAndWhite.perPage,
    color: pricingSettings.color.perPage,
    bulkThreshold: pricingSettings.discounts.bulkOrder.threshold,
    bulkDiscount: `${pricingSettings.discounts.bulkOrder.discount * 100}%`,
    studentDiscount: `${pricingSettings.discounts.studentDiscount * 100}%`
  }
}