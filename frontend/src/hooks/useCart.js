import { useEffect } from 'react'
import useCartStore from '../store/cartStore'

function useCart() {
  const {
    items,
    totalAmount,
    addItem,
    removeItem,
    updateItemQuantity,
    clearCart,
    calculateTotal,
    getItemCount
  } = useCartStore()

  // Auto-calculate total when items change
  useEffect(() => {
    calculateTotal()
  }, [items, calculateTotal])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart && JSON.parse(savedCart).length > 0) {
      const parsedCart = JSON.parse(savedCart)
      parsedCart.forEach(item => addItem(item))
    }
  }, [])

  return {
    items,
    totalAmount,
    itemCount: getItemCount(),
    addToCart: addItem,
    removeFromCart: removeItem,
    updateQuantity: updateItemQuantity,
    clearCart,
    isEmpty: items.length === 0
  }
}

export default useCart