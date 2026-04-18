import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useUserStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      isAuthenticated: false,
      recentOrders: [],
      
      // Set user
      setUser: (userData) => {
        set({ 
          user: userData, 
          isAuthenticated: true 
        })
      },
      
      // Clear user (logout)
      clearUser: () => {
        set({ 
          user: null, 
          isAuthenticated: false 
        })
      },
      
      // Update user info
      updateUser: (updates) => {
        set((state) => ({
          user: { ...state.user, ...updates }
        }))
      },
      
      // Add recent order
      addRecentOrder: (order) => {
        set((state) => ({
          recentOrders: [order, ...state.recentOrders].slice(0, 10) // Keep last 10 orders
        }))
      },
      
      // Get user name (for checkout)
      getUserName: () => {
        return get().user?.name || ''
      },
      
      // Get user email
      getUserEmail: () => {
        return get().user?.email || ''
      },
      
      // Get user phone
      getUserPhone: () => {
        return get().user?.phone || ''
      }
    }),
    {
      name: 'user-storage',
      getStorage: () => localStorage
    }
  )
)

export default useUserStore