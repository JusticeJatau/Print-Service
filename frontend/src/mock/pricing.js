export const pricingSettings = {
  blackAndWhite: {
    perPage: 5, // in Naira or your currency
    doubleSidedDiscount: 0.1 // 10% discount
  },
  color: {
    perPage: 20,
    doubleSidedDiscount: 0.1
  },
  discounts: {
    bulkOrder: {
      threshold: 50, // pages
      discount: 0.15 // 15% off
    },
    studentDiscount: 0.05 // 5% off for students
  }
}

export const defaultPricing = {
  blackAndWhite: 5,
  color: 20,
  currency: "₦"
}