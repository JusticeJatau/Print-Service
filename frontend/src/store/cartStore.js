import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useCartStore = create(
  persist(
    (set, get) => ({
      // State
      items: [],
      totalAmount: 0,
      
      // Add item to cart
      addItem: (item) => {
        const currentItems = get().items
        const existingItemIndex = currentItems.findIndex(
          (cartItem) => 
            cartItem.fileName === item.fileName && 
            cartItem.printType === item.printType &&
            cartItem.copies === item.copies
        )
        
        let newItems
        if (existingItemIndex !== -1) {
          // Update existing item
          newItems = [...currentItems]
          newItems[existingItemIndex] = {
            ...newItems[existingItemIndex],
            copies: newItems[existingItemIndex].copies + item.copies,
            totalPrice: (newItems[existingItemIndex].copies + item.copies) * newItems[existingItemIndex].pricePerCopy
          }
        } else {
          // Add new item
          newItems = [...currentItems, { ...item, id: Date.now() }]
        }
        
        set({ items: newItems })
        get().calculateTotal()
      },
      
      // Remove item from cart
      removeItem: (itemId) => {
        const newItems = get().items.filter(item => item.id !== itemId)
        set({ items: newItems })
        get().calculateTotal()
      },
      
      // Update item quantity
      updateItemQuantity: (itemId, newQuantity) => {
        const newItems = get().items.map(item => {
          if (item.id === itemId) {
            return {
              ...item,
              copies: newQuantity,
              totalPrice: item.pricePerCopy * newQuantity
            }
          }
          return item
        })
        set({ items: newItems })
        get().calculateTotal()
      },
      
      // Calculate total amount
      calculateTotal: () => {
        const total = get().items.reduce((sum, item) => sum + item.totalPrice, 0)
        set({ totalAmount: total })
      },
      
      // Clear cart
      clearCart: () => {
        set({ items: [], totalAmount: 0 })
      },
      
      // Get cart item count
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.copies, 0)
      }
    }),
    {
      name: 'print-cart', // localStorage key
      getStorage: () => localStorage
    }
  )
)

export default useCartStore