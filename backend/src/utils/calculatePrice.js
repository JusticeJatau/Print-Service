const calculatePrintPrice = (pages, copies, printType, isDoubleSided, pricingSettings) => {
  let pricePerPage;
  
  if (printType === 'color') {
    pricePerPage = pricingSettings.color.perPage;
  } else {
    pricePerPage = pricingSettings.blackAndWhite.perPage;
  }
  
  let totalPages = pages * copies;
  let totalPrice = totalPages * pricePerPage;
  
  // Apply double-sided discount
  if (isDoubleSided) {
    const discount = printType === 'color' 
      ? pricingSettings.color.doubleSidedDiscount 
      : pricingSettings.blackAndWhite.doubleSidedDiscount;
    totalPrice = totalPrice * (1 - discount);
  }
  
  // Apply bulk discount
  if (totalPages >= pricingSettings.discounts.bulkOrder.threshold) {
    totalPrice = totalPrice * (1 - pricingSettings.discounts.bulkOrder.discount);
  }
  
  return Math.round(totalPrice);
};

const getPriceBreakdown = (pages, copies, printType, isDoubleSided, pricingSettings) => {
  let pricePerPage;
  
  if (printType === 'color') {
    pricePerPage = pricingSettings.color.perPage;
  } else {
    pricePerPage = pricingSettings.blackAndWhite.perPage;
  }
  
  let totalPages = pages * copies;
  let subtotal = totalPages * pricePerPage;
  let discounts = [];
  let finalPrice = subtotal;
  
  // Double-sided discount
  if (isDoubleSided) {
    const discountAmount = subtotal * (printType === 'color' 
      ? pricingSettings.color.doubleSidedDiscount 
      : pricingSettings.blackAndWhite.doubleSidedDiscount);
    discounts.push({
      name: 'Double-sided printing',
      amount: Math.round(discountAmount),
    });
    finalPrice = subtotal - discountAmount;
  }
  
  // Bulk discount
  if (totalPages >= pricingSettings.discounts.bulkOrder.threshold) {
    const discountAmount = finalPrice * pricingSettings.discounts.bulkOrder.discount;
    discounts.push({
      name: `Bulk order (${pricingSettings.discounts.bulkOrder.threshold}+ pages)`,
      amount: Math.round(discountAmount),
    });
    finalPrice = finalPrice - discountAmount;
  }
  
  return {
    subtotal: Math.round(subtotal),
    discounts,
    total: Math.round(finalPrice),
    pricePerPage,
    totalPages,
  };
};

module.exports = { calculatePrintPrice, getPriceBreakdown };