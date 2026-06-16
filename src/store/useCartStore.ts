import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, MenuItem, Restaurant } from '../types'

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: MenuItem, restaurant: Restaurant, instructions?: string) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, qty: number) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
  subtotal: () => number
  itemCount: () => number
  deliveryFee: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item, restaurant, instructions = '') => {
        const existing = get().items.find(i => i.item.id === item.id)
        if (existing) {
          set(s => ({
            items: s.items.map(i =>
              i.item.id === item.id ? { ...i, quantity: i.quantity + 1, totalPrice: item.price * (i.quantity + 1) } : i
            ),
          }))
        } else {
          set(s => ({
            items: [...s.items, { item, restaurant, quantity: 1, specialInstructions: instructions, totalPrice: item.price }],
          }))
        }
      },

      removeItem: (itemId) => set(s => ({ items: s.items.filter(i => i.item.id !== itemId) })),

      updateQuantity: (itemId, qty) => {
        if (qty <= 0) { get().removeItem(itemId); return }
        set(s => ({
          items: s.items.map(i => i.item.id === itemId ? { ...i, quantity: qty, totalPrice: i.item.price * qty } : i),
        }))
      },

      clearCart: () => set({ items: [] }),
      toggleCart: () => set(s => ({ isOpen: !s.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      subtotal: () => get().items.reduce((sum, i) => sum + i.totalPrice, 0),
      itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      deliveryFee: () => {
        const sub = get().subtotal()
        if (get().items.length === 0) return 0
        const restaurant = get().items[0]?.restaurant
        return sub > 1000 ? 0 : (restaurant?.deliveryFee || 49)
      },
    }),
    { name: 'foodiex-cart' }
  )
)
